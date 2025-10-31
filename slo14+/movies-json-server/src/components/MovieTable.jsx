import React from 'react';
import { Table, Button, Image, Modal, Alert, Spinner, Badge } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';

const MovieTable = () => {
  const state = useMovieState();
  const { dispatch, confirmDelete } = useMovieDispatch();
  const { movies, loading, movieToDelete, showDeleteModal } = state;

  // Mapping genreId to genre name
  const genreMap = {
    1: 'Sci-Fi',
    2: 'Comedy',
    3: 'Drama',
    4: 'Horror',
    5: 'Romance',
    6: 'Action',
    7: 'Thriller'
  };

  // Hàm để lấy màu badge theo thể loại
  const getCategoryBadgeVariant = (genreName) => {
    const categoryColors = {
      'Sci-Fi': 'primary',
      'Comedy': 'warning',
      'Drama': 'info',
      'Horror': 'dark',
      'Romance': 'danger',
      'Action': 'success',
      'Thriller': 'secondary'
    };
    return categoryColors[genreName] || 'secondary';
  };

  const handleEditClick = (movie) => {
    dispatch({ type: 'OPEN_EDIT_MODAL', payload: movie });
  };

  const handleDeleteClick = (movie) => {
    dispatch({ type: 'OPEN_DELETE_MODAL', payload: movie });
  };

  return (
    <>
      {loading && movies.length === 0 ? (
        <div className="text-center my-4">
          <Spinner animation="border" role="status" variant="primary" className="me-2" />
          <Alert variant="info" className="mt-3">Đang tải dữ liệu phim...</Alert>
        </div>
      ) : (
        <Table striped bordered hover responsive className="mt-4">
          <thead className="table-dark">
            <tr>
              <th style={{ width: '80px' }}>Avatar</th>
              <th style={{ width: '60px' }}>ID</th>
              <th>Tên Phim</th>
              <th style={{ width: '120px' }}>Thể loại</th>
              <th style={{ width: '100px' }}>Thời lượng</th>
              <th style={{ width: '100px' }}>Quốc gia</th>
              <th style={{ width: '150px' }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {movies.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  <Alert variant="warning" className="mb-0">
                    Chưa có phim nào. Hãy thêm phim mới!
                  </Alert>
                </td>
              </tr>
            ) : (
              movies.map((movie) => {
                const genreName = genreMap[movie.genreId] || 'Unknown';
                return (
                  <tr key={movie.id}>
                    <td>
                      <Image 
                        src={movie.avatar} 
                        alt={movie.title} 
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                        rounded 
                      />
                    </td>
                    <td>#{movie.id}</td>
                    <td>
                      <strong>{movie.title}</strong>
                      <br />
                      <small className="text-muted">({movie.year})</small>
                    </td>
                    <td>
                      <Badge bg={getCategoryBadgeVariant(genreName)}>
                        {genreName}
                      </Badge>
                    </td>
                    <td>{movie.duration} phút</td>
                    <td>{movie.country}</td>
                    <td>
                      <Button 
                        variant="primary" 
                        size="sm" 
                        onClick={() => handleEditClick(movie)} 
                        className="me-2"
                      >
                        ✏️ Sửa
                      </Button>
                      <Button 
                        variant="danger" 
                        size="sm" 
                        onClick={() => handleDeleteClick(movie)}
                      >
                        🗑️ Xóa
                      </Button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </Table>
      )}

      {/* MODAL XÁC NHẬN XÓA */}
      <Modal show={showDeleteModal} onHide={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>
        <Modal.Header closeButton>
          <Modal.Title>⚠️ Xác nhận Xóa Phim</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa phim <strong>"{movieToDelete?.title}"</strong> (ID: {movieToDelete?.id}) không?
          <Alert variant="warning" className="mt-3 mb-0">
            <small>Hành động này không thể hoàn tác!</small>
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}
          >
            Hủy bỏ
          </Button>
          <Button 
            variant="danger" 
            onClick={() => confirmDelete(movieToDelete.id)}
          >
            Xác nhận Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MovieTable;