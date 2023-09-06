import { Form } from 'react-bootstrap';

export const MoviesFilter = ({ filter, setFilter }) => {
  return (
    <Form.Control
      type="text"
      placeholder="Search..."
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    />
  );
};