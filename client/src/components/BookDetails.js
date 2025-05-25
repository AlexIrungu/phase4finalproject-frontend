import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { IconButton, Box, Typography, Button, Tabs, Tab } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../theme";
import { addToCart } from "./state";
import { useParams, useNavigate } from "react-router-dom";
import BookCard from "./BookCard";

const BookDetails = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const [book, setBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const getBook = async () => {
    try {
      // Validate bookId before making request
      if (!bookId || bookId === 'undefined' || bookId === 'null') {
        throw new Error('Invalid book ID');
      }

      setLoading(true);
      const response = await axios.get(`http://localhost:3001/books/${bookId}`);
      const fetchedBook = response.data;
      console.log('Fetched book:', fetchedBook);
      setBook(fetchedBook);
      setError(null);
    } catch (err) {
      console.error('Error fetching book:', err);
      setError(err.response?.status === 404 ? 'Book not found' : 'Failed to load book details');
    } finally {
      setLoading(false);
    }
  };

  const getBooks = async () => {
    try {
      const response = await axios.get("http://localhost:3001/books");
      const fetchedBooks = response.data;
      console.log('Fetched books:', fetchedBooks);
      setBooks(fetchedBooks);
    } catch (err) {
      console.error('Error fetching books:', err);
    }
  };

  useEffect(() => {
    if (bookId && bookId !== 'undefined') {
      getBook();
      getBooks();
    } else {
      setError('Invalid book ID');
      setLoading(false);
    }
  }, [bookId]);

  // Function to get the correct image URL
  const getImageUrl = (book) => {
    const imageUrl = book?.imageURL || book?.image_url || book?.image;
    
    if (!imageUrl || imageUrl === 'null' || imageUrl === '') {
      return '/placeholder-book.jpg';
    }
    
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    
    return imageUrl;
  };

  const handleImageError = (e) => {
    console.log('Image failed to load:', e.target.src);
    e.target.src = '/placeholder-book.jpg';
  };

  if (loading) {
    return (
      <Box width="80%" m="80px auto" display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <Typography variant="h6" sx={{ mt: 2, color: 'gray' }}>
            Loading book details...
          </Typography>
        </div>
      </Box>
    );
  }

  if (error) {
    return (
      <Box width="80%" m="80px auto">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg text-center">
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
            Error
          </Typography>
          <Typography sx={{ mb: 3 }}>{error}</Typography>
          <div className="space-x-4">
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => navigate('/')}
            >
              Go Home
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        </div>
      </Box>
    );
  }

  if (!book) {
    return (
      <Box width="80%" m="80px auto" textAlign="center">
        <Typography variant="h4">Book not found</Typography>
        <Button 
          variant="contained" 
          sx={{ mt: 2 }} 
          onClick={() => navigate('/')}
        >
          Go Back to Books
        </Button>
      </Box>
    );
  }

  return (
    <div className="box">
      <Box width="80%" m="80px auto">
        {/* Navigation breadcrumb */}
        <Box mb="20px">
          <Button 
            onClick={() => navigate('/')} 
            sx={{ textTransform: 'none', color: 'gray' }}
          >
            ← Back to Books
          </Button>
        </Box>

        <Box display="flex" flexWrap="wrap" columnGap="40px">
          {/* Book image */}
          <Box flex="1 1 40%" mb="40px">
            <img
              alt={book?.title || 'Book cover'}
              width="100%"
              height="100%"
              src={getImageUrl(book)}
              onError={handleImageError}
              style={{ 
                objectFit: "contain", 
                maxHeight: "600px",
                border: "1px solid #eee",
                borderRadius: "8px"
              }}
            />
          </Box>

          {/* Book details and actions */}
          <Box flex="1 1 50%" mb="40px">
            <Box m="20px 0 25px 0">
              <Typography variant="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
                {book?.title}
              </Typography>
              <Typography variant="h5" sx={{ color: 'green', fontWeight: 'bold', mb: 2 }}>
                KSh. {book?.price ? parseFloat(book.price).toFixed(2) : 'N/A'}
              </Typography>
              <Typography variant="body1" sx={{ color: 'gray', mb: 1 }}>
                <strong>Author:</strong> {book?.author || 'Unknown'}
              </Typography>
              <Typography variant="body1" sx={{ color: 'gray', mb: 1 }}>
                <strong>Publisher:</strong> {book?.publisher || 'Unknown'}
              </Typography>
              <Typography variant="body1" sx={{ color: 'gray', mb: 2 }}>
                <strong>Published:</strong> {book?.publication_date || 'Unknown'}
              </Typography>
              {book?.category && (
                <Typography variant="body1" sx={{ color: 'blue', mb: 2 }}>
                  <strong>Category:</strong> {book.category.genre || book.category.name}
                </Typography>
              )}
              <Typography sx={{ mt: "20px", lineHeight: 1.6 }}>
                {book?.description || 'No description available.'}
              </Typography>
            </Box>

            {/* Quantity and Add to Cart */}
            <Box display="flex" alignItems="center" minHeight="50px">
              <Box
                display="flex"
                alignItems="center"
                border={`1.5px solid ${shades.neutral[300]}`}
                mr="20px"
                p="2px 5px"
                borderRadius="4px"
              >
                <IconButton 
                  onClick={() => setCount(Math.max(count - 1, 1))}
                  disabled={count <= 1}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{ p: "0 15px", minWidth: "20px", textAlign: "center" }}>
                  {count}
                </Typography>
                <IconButton onClick={() => setCount(count + 1)}>
                  <AddIcon />
                </IconButton>
              </Box>
              <Button
                sx={{
                  backgroundColor: "#222222",
                  color: "white",
                  borderRadius: "4px",
                  minWidth: "150px",
                  padding: "12px 24px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#333333",
                  },
                }}
                onClick={() => {
                  if (book) {
                    dispatch(addToCart({ item: { ...book, count } }));
                  }
                }}
                disabled={!book}
              >
                ADD TO CART
              </Button>
            </Box>

            {/* Wishlist */}
            <Box mt="20px">
              <Box display="flex" alignItems="center" sx={{ cursor: 'pointer' }}>
                <FavoriteBorderOutlinedIcon />
                <Typography sx={{ ml: "8px" }}>ADD TO WISHLIST</Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Tabs for description and reviews */}
        <Box m="40px 0 20px 0">
          <Tabs value={value} onChange={handleChange}>
            <Tab label="DESCRIPTION" value="description" />
            <Tab label="REVIEWS" value="reviews" />
          </Tabs>
        </Box>

        <Box p="20px 0" minHeight="100px">
          {value === "description" && (
            <div>
              <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                {book?.description || 'No detailed description available for this book.'}
              </Typography>
            </div>
          )}
          {value === "reviews" && (
            <div>
              <Typography variant="body1" sx={{ color: 'gray', fontStyle: 'italic' }}>
                Reviews feature coming soon! Check back later to see what other readers think about this book.
              </Typography>
            </div>
          )}
        </Box>

        {/* Related Products */}
        <Box mt="50px" width="100%">
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
            Related Products
          </Typography>
          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            gap="20px"
          >
            {books.slice(0, 6).map((relatedBook) => (
              <BookCard key={relatedBook.id} book={relatedBook} />
            ))}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default BookDetails;