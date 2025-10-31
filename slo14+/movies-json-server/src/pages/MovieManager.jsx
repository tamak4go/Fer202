import React from 'react';
import { Container } from 'react-bootstrap';
import { MovieProvider } from '../contexts/MovieContext';
import MovieForm from '../components/MovieForm';
import MovieTable from '../components/MovieTable';
import Header from '../components/Header';

// Component con hiển thị nội dung
const MovieManagerContent = () => {
  return (
    <>
      <Header />
      <Container>
        <h1 className="text-center mb-4 text-primary">
          🎬 Quản lý Phim (Context + useReducer + Axios)
        </h1>
        
        <MovieForm />
        
        <h2 className="mt-5 mb-3">📋 Danh sách Phim</h2>
        
        <MovieTable />
      </Container>
    </>
  );
}

// Component chính cung cấp Context
const MovieManager = () => (
  <MovieProvider>
    <MovieManagerContent />
  </MovieProvider>
);

export default MovieManager;