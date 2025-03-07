import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/useToast';
import { addBusiness } from '@/api/businesses';

const businessSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.string().min(1, 'Type is required'),
  revenue: z.number().min(0, 'Revenue must be positive'),
  expenses: z.number().min(0, 'Expenses must be positive'),
  employees: z.number().int().min(1, 'Must have at least 1 employee'),
  status: z.enum(['active', 'inactive']),
  notes: z.string(),
  website: z.string().url('Must be a valid URL').or(z.string().length(0))
});

type BusinessFormData = z.infer<typeof businessSchema>;

export function BusinessList() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<BusinessFormData>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      status: 'active',
      notes: '',
      website: ''
    }
  });

  const onSubmit = async (data: BusinessFormData) => {
    try {
      setIsLoading(true);
      await addBusiness(data);
      toast({
        title: "Success",
        description: "Business added successfully"
      });
      navigate('/businesses', { state: { refresh: true } });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Add New Business</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Input
                placeholder="Business Name"
                {...register('name')}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Input
                placeholder="Business Type"
                {...register('type')}
              />
              {errors.type && (
                <p className="text-sm text-destructive">{errors.type.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Input
                type="number"
                placeholder="Revenue"
                {...register('revenue', { valueAsNumber: true })}
              />
              {errors.revenue && (
                <p className="text-sm text-destructive">{errors.revenue.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Input
                type="number"
                placeholder="Expenses"
                {...register('expenses', { valueAsNumber: true })}
              />
              {errors.expenses && (
                <p className="text-sm text-destructive">{errors.expenses.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Input
                type="number"
                placeholder="Number of Employees"
                {...register('employees', { valueAsNumber: true })}
              />
              {errors.employees && (
                <p className="text-sm text-destructive">{errors.employees.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Input
                placeholder="Website URL"
                {...register('website')}
              />
              {errors.website && (
                <p className="text-sm text-destructive">{errors.website.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <textarea
                className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background text-sm"
                placeholder="Notes"
                {...register('notes')}
              />
              {errors.notes && (
                <p className="text-sm text-destructive">{errors.notes.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Select onValueChange={(value) => setValue('status', value as 'active' | 'inactive')}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && (
                <p className="text-sm text-destructive">{errors.status.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Business"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}