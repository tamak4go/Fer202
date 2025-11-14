import React, { useState, useEffect, useMemo } from 'react';
import { Container, Card, Alert, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import UserFilter from '../components/UserFilter';
import UserTable from '../components/UserTable';
import { fetchUsers, selectUsers, selectUsersError, selectUsersLoading } from '../features/users/usersSlice';

const UserListPage = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const isLoading = useSelector(selectUsersLoading);
  const error = useSelector(selectUsersError);

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = useMemo(() => {
    let result = [...users];

    if (searchTerm) {
      result = result.filter(
        (u) =>
          u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter) {
      result = result.filter((u) => u.role === roleFilter);
    }

    if (statusFilter) {
      result = result.filter((u) => u.status === statusFilter);
    }

    return result;
  }, [users, searchTerm, roleFilter, statusFilter]);

  return (
    <>
      <Header />
      <Container className="mt-4">
        <h2 className="mb-4">User Management</h2>

        <UserFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}

        <Card className="mt-3">
          <Card.Body>
            {isLoading ? (
              <div className="d-flex justify-content-center align-items-center py-4">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : (
              <UserTable users={filteredUsers} />
            )}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default UserListPage;