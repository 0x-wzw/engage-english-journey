
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { useTranslation } from "@/contexts/TranslationContext";

interface Course {
  id: string;
  level: string;
  summary: string;
  created_at: string;
  updated_at: string;
}

const emptyCourse = { level: "", summary: "" };

export default function CoursesAdmin() {
  const { user, loading } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [formCourse, setFormCourse] = useState<{ id?: string; level: string; summary: string }>({ ...emptyCourse });
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const { t } = useTranslation();

  // Only allow admins (enforced in RLS, but we also check here for better UX)
  const [notAdmin, setNotAdmin] = useState(false);

  useEffect(() => {
    if (loading) return;
    const checkAdmin = async () => {
      if (!user) { setNotAdmin(true); return; }
      // Use has_role function
      const { data, error } = await supabase.rpc("has_role", { _user_id: user.id, _role: "admin" });
      if (error || !data) setNotAdmin(true);
      else setNotAdmin(false);
    };
    checkAdmin();
  }, [user, loading]);

  const fetchCourses = async () => {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: true });
    if (!error) setCourses(data || []);
    else toast({ title: "Error", description: "Could not fetch courses.", variant: "destructive" });
  };

  useEffect(() => {
    if (!notAdmin && !loading) {
      fetchCourses();
    }
  }, [notAdmin, loading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormCourse({ ...formCourse, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    if (isEditing && formCourse.id) {
      // Update
      const { error } = await supabase
        .from("courses")
        .update({ level: formCourse.level, summary: formCourse.summary, updated_at: new Date().toISOString() })
        .eq("id", formCourse.id);
      if (!error) {
        toast({ title: "Course updated" });
        fetchCourses();
        setFormCourse({ ...emptyCourse });
        setIsEditing(false);
      } else {
        toast({ title: "Error", description: "Could not update.", variant: "destructive" });
      }
    } else {
      // Insert
      const { error } = await supabase
        .from("courses")
        .insert([{ level: formCourse.level, summary: formCourse.summary }]);
      if (!error) {
        toast({ title: "Course created" });
        fetchCourses();
        setFormCourse({ ...emptyCourse });
      } else {
        toast({ title: "Error", description: "Could not create.", variant: "destructive" });
      }
    }
    setSaving(false);
  };

  const handleEdit = (course: Course) => {
    setFormCourse({ id: course.id, level: course.level, summary: course.summary || "" });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this course?")) return;
    const { error } = await supabase.from("courses").delete().eq("id", id);
    if (!error) {
      toast({ title: "Course deleted" });
      fetchCourses();
    } else {
      toast({ title: "Error", description: "Could not delete.", variant: "destructive" });
    }
  };

  if (loading) {
    return <Layout><div>{t('auth.loading')}</div></Layout>;
  }

  if (notAdmin) {
    return (
      <Layout>
        <div className="max-w-lg mx-auto bg-destructive/10 border border-destructive/30 text-destructive p-6 mt-10 rounded text-center">
          <div className="font-bold text-xl mb-2">{t('admin.accessDenied')}</div>
          <div>{t('admin.mustBeAdmin')}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto bg-card border border-border rounded-lg p-8 mt-8 shadow-md animate-fade-in">
        <h1 className="text-2xl font-bold mb-4 text-primary">{t('admin.coursesTitle')}</h1>
        <form
          onSubmit={handleSave}
          className="flex flex-col gap-3 mb-7 bg-muted/30 rounded p-4 border"
        >
          <div className="flex gap-3 flex-col sm:flex-row">
            <Input
              placeholder={t('admin.level')}
              name="level"
              value={formCourse.level}
              onChange={handleChange}
              required
              className="flex-1"
              maxLength={50}
            />
            <Textarea
              placeholder={t('admin.summary')}
              name="summary"
              value={formCourse.summary}
              onChange={handleChange}
              rows={2}
              className="flex-1"
              required
              maxLength={300}
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={saving} className="px-6">
              {isEditing ? t('admin.update') : t('admin.add')}
            </Button>
            {isEditing && (
              <Button
                type="button"
                variant="secondary"
                onClick={() => { setFormCourse({ ...emptyCourse }); setIsEditing(false); }}
              >
                {t('admin.cancel')}
              </Button>
            )}
          </div>
        </form>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('admin.level')}</TableHead>
              <TableHead>{t('admin.summary')}</TableHead>
              <TableHead className="w-24">{t('admin.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map(course => (
              <TableRow key={course.id}>
                <TableCell>{course.level}</TableCell>
                <TableCell>{course.summary}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(course)}>{t('admin.edit')}</Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(course.id)}>{t('admin.delete')}</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {courses.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-muted-foreground">{t('admin.noCourses')}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Layout>
  );
}
