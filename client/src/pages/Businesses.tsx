import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Pencil } from 'lucide-react';
import { getBusinesses, updateBusiness } from '@/api/businesses';
import { useToast } from '@/hooks/useToast';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function Businesses() {
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingBusiness, setEditingBusiness] = useState<any>(null);
  const { toast } = useToast();
  const location = useLocation();

  const fetchBusinesses = async () => {
    try {
      setIsLoading(true);
      const data = await getBusinesses();
      setBusinesses(data);
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

  useEffect(() => {
    fetchBusinesses();
  }, []);

  // Refresh when navigating back from add business page
  useEffect(() => {
    if (location.state?.refresh) {
      fetchBusinesses();
    }
  }, [location.state]);

  const handleUpdate = async (id: string, data: any) => {
    try {
      const response = await updateBusiness(id, data);
      setBusinesses(businesses.map(b => b._id === id ? response.business : b));
      toast({
        title: "Success",
        description: "Business updated successfully"
      });
      setEditingBusiness(null);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Businesses</h2>
        <Link to="/businesses/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Business
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {businesses.map((business) => (
            <Card key={business._id} className="transition-all hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-xl font-bold">{business.name}</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => setEditingBusiness(business)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Business</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Input
                          defaultValue={business.name}
                          onChange={(e) => setEditingBusiness({...editingBusiness, name: e.target.value})}
                          placeholder="Business Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Input
                          defaultValue={business.type}
                          onChange={(e) => setEditingBusiness({...editingBusiness, type: e.target.value})}
                          placeholder="Business Type"
                        />
                      </div>
                      <div className="space-y-2">
                        <Input
                          type="number"
                          defaultValue={business.revenue}
                          onChange={(e) => setEditingBusiness({...editingBusiness, revenue: Number(e.target.value)})}
                          placeholder="Revenue"
                        />
                      </div>
                      <div className="space-y-2">
                        <Input
                          type="number"
                          defaultValue={business.expenses}
                          onChange={(e) => setEditingBusiness({...editingBusiness, expenses: Number(e.target.value)})}
                          placeholder="Expenses"
                        />
                      </div>
                      <div className="space-y-2">
                        <Input
                          type="number"
                          defaultValue={business.employees}
                          onChange={(e) => setEditingBusiness({...editingBusiness, employees: Number(e.target.value)})}
                          placeholder="Number of Employees"
                        />
                      </div>
                      <div className="space-y-2">
                        <Select
                          defaultValue={business.status}
                          onValueChange={(value) => setEditingBusiness({...editingBusiness, status: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        className="w-full"
                        onClick={() => handleUpdate(business._id, editingBusiness)}
                      >
                        Save Changes
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Type</span>
                  <span>{business.type}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Revenue</span>
                  <span>${business.revenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Expenses</span>
                  <span>${business.expenses.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Employees</span>
                  <span>{business.employees}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge variant={business.status === 'active' ? 'default' : 'secondary'}>
                    {business.status}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Performance</span>
                  <span>{business.performance}%</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}