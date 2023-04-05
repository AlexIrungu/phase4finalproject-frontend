import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Tabs, Tab, Box, Typography, useMediaQuery } from "@mui/material";
import BookCard from "./BookCard";
import { setBooks } from "./state";

const BookList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const books = useSelector((state) => state.cart.books);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  // console.log("books", books);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  let[userBooks, setUserBooks] = useState([])

  // fetch books data from the backend
  const getBooks = () => {
    // setUserBooks(fetchedBooks)
    // dispatch(setBooks(fetchedBooks))
    axios
      .get("https://inkwell-library.onrender.com/books")
      .then((res) => {
        const fetchedBooks = res.data;
         console.log(fetchedBooks);
         setUserBooks(res.data)
        dispatch(setBooks(fetchedBooks));
      })
      .catch((err) => console.log(err));
  };

let bookList = userBooks.map(book => {
  return(
    <li>{book.title}</li>
  )
})
  
let [userCategories, setUserCategories] = useState([])

  // fetch categories
  const getCategories = () => {
    axios.get("https://inkwell-library.onrender.com/categories").then((res) => {
      const fetchedCategories = res.data;
      setUserCategories(res.data)
      //  console.log(res.data["books"])
        console.log(fetchedCategories);
    });
  };

  let[currentCategory, setCurrentCategory] = useState("")

  userBooks.map((books)=>{
    console.log(books.title)
  })

  userCategories.map((category)=>{
      console.log(category.genre)
  })

   console.log(userCategories)
   console.log(userBooks);

 let fantasyBooksList = userCategories.filter((category) => {return category.genre === "Fantasy"});

 //console.log(fantasyBooksList.books)


 let fantasyBooks = fantasyBooksList[0];
  //console.log(fantasyBooks)

 let fantasyList = fantasyBooksList.map(item => {
  return(
    <li>{item.title}</li>
  )
})

let booksList = userBooks.map(stat => {
  return(
    <ul className="books-list">
    <li>
      <img src={stat.imageURL} /></li>
      <li>{stat.title}</li>
      <li>{stat.publication_date}</li>
      <li>{stat.publisher}</li>
      </ul>
  )
})
  

  let categoriesList = userCategories.map(item => {
    return(
      <ul>
      <li>{item.genre}</li>
      <li>{item.title}</li>
      </ul>
      
    )
  })


  useEffect(() => {
    getBooks();
    getCategories();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [allBooks, setAllBooks] = useState(true)
  const [allCategories, setAllCategories] = useState(false)
  const [allValue, setAllValue] = useState("all")

  // include filters for categories here!!!
  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Featured <b>Books</b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: isNonMobile ? "block" : "none" } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >

        {/* displays the various filters available for the books.  */}
        <Tab onClick={()=>{setAllValue("all")}} 
        label="All" value="all" />
        <Tab onClick={()=>{setAllValue("categories")}} 
        label="Categories" value="categories" />
        {/* <Tab onClick={()=>{}} label="Thrillers" value="thriller" />
        <Tab onClick={()=>{}} label="Adult" value="adult" /> */}
      </Tabs>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {/* /* {value === "all" &&
          books.map((book) => <BookCard book={book} key={book.id} />)} */
          // <ul>
           
          // </ul> */
        }
          
              { allValue === "all" && (
              <ul> {booksList}
                </ul> )
                 } 

                {allValue === "categories" && ( 
              <ul> {categoriesList}
                </ul> )} 

          

          
      </Box>
    </Box>
  );
};

export default BookList;