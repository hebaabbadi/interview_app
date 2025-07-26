import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CssBaseline,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  InputAdornment,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const primaryColor = '#fb8e40';

export default function Admin() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editUser, setEditUser] = useState({ name: '', email: '' });
  const [createUser, setCreateUser] = useState({ name: '', email: '', password: '' });
  const [editError, setEditError] = useState('');
  const [createError, setCreateError] = useState('');
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers((prev) => prev.filter((user) => user._id !== userId));
      setOpenDeleteDialog(false);
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  const handleEditUser = async () => {
    try {
      setEditError('');
      const res = await axios.put(`http://localhost:5000/api/users/${selectedUser._id}`, editUser, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers((prev) =>
        prev.map((user) => (user._id === selectedUser._id ? res.data : user))
      );
      setOpenEditDialog(false);
      setSelectedUser(null);
      setEditUser({ name: '', email: '' });
    } catch (err) {
      setEditError(err.response?.data?.error || 'Failed to update user');
    }
  };

  const handleCreateUser = async () => {
    try {
      setCreateError('');
      const res = await axios.post('http://localhost:5000/api/auth/register', createUser, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers((prev) => [...prev, res.data.user]);
      setOpenCreateDialog(false);
      setCreateUser({ name: '', email: '', password: '' });
    } catch (err) {
      setCreateError(err.response?.data?.error || 'Failed to create user');
    }
  };

  const handleOpenEditDialog = (user) => {
    setSelectedUser(user);
    setEditUser({ name: user.name, email: user.email });
    setEditError('');
    setOpenEditDialog(true);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    totalUsers: users.length,
    newThisMonth: users.filter(user => {
      const joinDate = new Date(user.joinDate);
      const now = new Date();
      return joinDate.getMonth() === now.getMonth() && joinDate.getFullYear() === now.getFullYear();
    }).length
  };

  return (
    <>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: '#27283D', color: '#fff' }}>
        <AppBar position="static" elevation={0} sx={{ bgcolor: "rgba(251, 142, 64, 0.1)", backdropFilter: "blur(10px)" }}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={() => navigate('/admin')}>
              <Typography sx={{ color: primaryColor, fontSize: '2rem' }}>🎓</Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, color: primaryColor, textShadow: '0 2px 4px rgba(251, 142, 64, 0.3)' }}>
                ORIENTATION - Admin
              </Typography>
            </Box>
            <Button variant="outlined" sx={{ borderColor: primaryColor, color: primaryColor, fontWeight: 600 }} onClick={() => navigate('/login')}>
              Log out
            </Button>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
             Dashboard
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 3 }}>
              <Card sx={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', borderRadius: '16px', border: '1px solid rgba(251, 142, 64, 0.2)' }}>
                <CardContent>
                  <Typography sx={{ color: '#aaa', mb: 1 }}>Total Users</Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: primaryColor }}>
                    {stats.totalUsers}
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', borderRadius: '16px', border: '1px solid rgba(33, 150, 243, 0.3)' }}>
                <CardContent>
                  <Typography sx={{ color: '#aaa', mb: 1 }}>New this month</Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: '#2196f3' }}>
                    {stats.newThisMonth}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Box>

          <Paper sx={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(20px)', borderRadius: 4, p: 3 }}>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#27283D' }}>
                  User Management
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <TextField
                    placeholder=""
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ width: 300 }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">🔍</InputAdornment>,
                    }}
                  />
                  <Button
                    variant="contained"
                    sx={{ bgcolor: primaryColor, '&:hover': { bgcolor: '#e8803a' } }}
                    onClick={() => setOpenCreateDialog(true)}
                  >
                   Create a User
                  </Button>
                </Box>
              </Box>
              <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)}
                sx={{
                  '& .MuiTab-root': { color: '#666', fontWeight: 600 },
                  '& .Mui-selected': { color: primaryColor },
                  '& .MuiTabs-indicator': { backgroundColor: primaryColor },
                }}
              >
                <Tab label="All" />
              </Tabs>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, color: '#27283D' }}>User</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#27283D' }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#27283D' }}>Registration Date</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#27283D' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user._id} sx={{ '&:hover': { bgcolor: 'rgba(251, 142, 64, 0.05)' } }}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ bgcolor: primaryColor }}>{user.name.charAt(0)}</Avatar>
                          <Typography sx={{ fontWeight: 600, color: '#27283D' }}>{user.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: '#666' }}>{user.email}</TableCell>
                      <TableCell sx={{ color: '#666' }}>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton size="small" sx={{ color: '#2196f3' }} onClick={() => handleOpenEditDialog(user)}>
                            ✏️
                          </IconButton>
                          <IconButton size="small" sx={{ color: '#f44336' }} onClick={() => {
                            setSelectedUser(user);
                            setOpenDeleteDialog(true);
                          }}>
                            🗑️
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>

        {/* Delete Dialog */}
        <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
          <DialogTitle>Confirm deletion</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete the user? {selectedUser?.name} ?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)} sx={{ color: '#666' }}>
              Cancel
            </Button>
            <Button onClick={() => handleDeleteUser(selectedUser._id)} variant="contained" sx={{ bgcolor: '#f44336', '&:hover': { bgcolor: '#d32f2f' } }}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            {editError && (
              <Typography color="error" sx={{ mb: 2 }}>
                {editError}
              </Typography>
            )}
            <TextField
              label="Nom"
              fullWidth
              value={editUser.name}
              onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
              sx={{ mb: 2, mt: 1 }}
              error={!!editError}
            />
            <TextField
              label="Email"
              fullWidth
              value={editUser.email}
              onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
              error={!!editError}
              helperText={editError}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)} sx={{ color: '#666' }}>
              Cancel
            </Button>
            <Button onClick={handleEditUser} variant="contained" sx={{ bgcolor: primaryColor, '&:hover': { bgcolor: '#e8803a' } }}>
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Create Dialog */}
        <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)}>
          <DialogTitle>Create new User </DialogTitle>
          <DialogContent>
            {createError && (
              <Typography color="error" sx={{ mb: 2 }}>
                {createError}
              </Typography>
            )}
            <TextField
              label="Nom"
              fullWidth
              value={createUser.name}
              onChange={(e) => setCreateUser({ ...createUser, name: e.target.value })}
              sx={{ mb: 2, mt: 1 }}
              error={!!createError}
            />
            <TextField
              label="Email"
              fullWidth
              value={createUser.email}
              onChange={(e) => setCreateUser({ ...createUser, email: e.target.value })}
              sx={{ mb: 2 }}
              error={!!createError}
            />
            <TextField
              label="Mot de passe"
              fullWidth
              type="password"
              value={createUser.password}
              onChange={(e) => setCreateUser({ ...createUser, password: e.target.value })}
              error={!!createError}
              helperText={createError}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenCreateDialog(false)} sx={{ color: '#666' }}>
              Cancel
            </Button>
            <Button onClick={handleCreateUser} variant="contained" sx={{ bgcolor: primaryColor, '&:hover': { bgcolor: '#e8803a' } }}>
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}