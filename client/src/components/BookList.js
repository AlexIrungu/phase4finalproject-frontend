import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const BookList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const [userBooks, setUserBooks] = useState([]);
  const [userCategories, setUserCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetch books data from the backend
  const getBooks = async () => {
    try {
      const response = await fetch("http://localhost:3001/books");
      if (!response.ok) throw new Error('Failed to fetch books');
      const fetchedBooks = await response.json();
      console.log("Fetched books:", fetchedBooks);
      setUserBooks(fetchedBooks);
    } catch (err) {
      console.error("Error fetching books:", err);
      setError("Failed to fetch books");
    }
  };

  // fetch categories
  const getCategories = async () => {
    try {
      const response = await fetch("http://localhost:3001/categories");
      if (!response.ok) throw new Error('Failed to fetch categories');
      const fetchedCategories = await response.json();
      console.log("Fetched categories:", fetchedCategories);
      setUserCategories(fetchedCategories);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to fetch categories");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([getBooks(), getCategories()]);
      setLoading(false);
    };
    
    fetchData();
  }, []);

  // Fixed BookCard component with proper navigation and image handling
  const BookCard = ({ book }) => {
    const handleBookClick = () => {
      // Ensure bookId is valid before navigating
      if (book?.id && book.id !== 'undefined') {
        // For React Router, use navigate instead of window.location
        // If you have React Router setup, uncomment the line below and comment the window.location line
        // navigate(`/books/${book.id}`);
        window.location.href = `/books/${book.id}`;
      } else {
        console.error('Invalid book ID:', book?.id);
      }
    };

    // Function to get the correct image URL
    const getImageUrl = (book) => {
      // Check for different possible image field names
      const imageUrl = book.imageURL || book.image_url || book.image;
      
      // If no image URL or it's invalid, return placeholder
      if (!imageUrl || imageUrl === 'null' || imageUrl === '') {
        return '/placeholder-book.jpg';
      }
      
      // If it's a full URL, return as is
      if (imageUrl.startsWith('http')) {
        return imageUrl;
      }
      
      // If it's a relative path, you might need to prepend your server URL
      // Adjust this based on how your images are served
      return imageUrl;
    };

    const handleImageError = (e) => {
      console.log('Image failed to load:', e.target.src);
      e.target.src = '/placeholder-book.jpg';
    };

    return (
      <div 
        className="book-card bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        onClick={handleBookClick}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleBookClick();
          }
        }}
      >
        <div className="book-image mb-3">
          <img 
            src={getImageUrl(book)}
            alt={book.title || 'Book cover'}
            className="w-full h-48 object-cover rounded"
            onError={handleImageError}
            loading="lazy"
          />
        </div>
        <div className="book-info">
          <h3 className="font-bold text-lg mb-2 line-clamp-2 min-h-[3.5rem]">
            {book.title || 'Untitled'}
          </h3>
          <p className="text-gray-600 text-sm mb-1">
            Author: {book.author || 'Unknown'}
          </p>
          <p className="text-gray-600 text-sm mb-1">
            Published: {book.publication_date || 'N/A'}
          </p>
          <p className="text-gray-600 text-sm mb-2">
            Publisher: {book.publisher || 'N/A'}
          </p>
          {book.price && (
            <p className="text-green-600 font-semibold text-lg">
              KSh. {parseFloat(book.price).toFixed(2)}
            </p>
          )}
          {book.category && (
            <p className="text-blue-600 text-xs mt-2 bg-blue-100 px-2 py-1 rounded-full inline-block">
              {book.category.genre || book.category.name}
            </p>
          )}
        </div>
      </div>
    );
  };

  const CategoryCard = ({ category }) => (
    <div className="category-card bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 mb-4 hover:shadow-md transition-shadow">
      <h3 className="font-bold text-xl mb-2 text-gray-800">
        {category.genre || category.name}
      </h3>
      <p className="text-gray-600">{category.title || category.description}</p>
      {category.book_count && (
        <p className="text-sm text-blue-600 mt-2">
          {category.book_count} books available
        </p>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="w-4/5 mx-auto mt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading books...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-4/5 mx-auto mt-20">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
          <h3 className="font-bold text-lg mb-2">Error</h3>
          <p className="mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-4/5 mx-auto mt-20 mb-20">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Featured <span className="text-blue-600">Books</span>
      </h1>
      
      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="flex border-b-2 border-gray-200">
          <button
            onClick={() => setValue("all")}
            className={`px-8 py-4 font-medium transition-all ${
              value === "all"
                ? "border-b-2 border-blue-500 text-blue-600 bg-blue-50"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            All Books ({userBooks.length})
          </button>
          <button
            onClick={() => setValue("categories")}
            className={`px-8 py-4 font-medium transition-all ${
              value === "categories"
                ? "border-b-2 border-blue-500 text-blue-600 bg-blue-50"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            Categories ({userCategories.length})
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="min-h-96">
        {value === "all" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {userBooks.length > 0 ? (
              userBooks.map((book) => (
                <BookCard key={book.id || Math.random()} book={book} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-20">
                <div className="text-6xl mb-4">📚</div>
                <h2 className="text-2xl font-semibold mb-2">No books available</h2>
                <p>Check back later for new additions to our collection.</p>
              </div>
            )}
          </div>
        )}

        {value === "categories" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {userCategories.length > 0 ? (
              userCategories.map((category) => (
                <CategoryCard key={category.id || Math.random()} category={category} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-20">
                <div className="text-6xl mb-4">📂</div>
                <h2 className="text-2xl font-semibold mb-2">No categories available</h2>
                <p>Categories will appear here once they are added.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Debug info - remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-12 p-4 bg-gray-100 rounded-lg text-sm border">
          <h3 className="font-bold mb-2">Debug Information:</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong>Books count:</strong> {userBooks.length}</p>
              <p><strong>Categories count:</strong> {userCategories.length}</p>
              <p><strong>Current tab:</strong> {value}</p>
            </div>
            <div>
              <p><strong>Loading:</strong> {loading.toString()}</p>
              <p><strong>Error:</strong> {error || 'None'}</p>
              <p><strong>Sample book ID:</strong> {userBooks[0]?.id || 'N/A'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;