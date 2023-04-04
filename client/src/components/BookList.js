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

  let[userbooks, setUserBooks] = useState([])

  // fetch books data from the backend
  const getBooks = () => {
    // setUserBooks(fetchedBooks)
    // dispatch(setBooks(fetchedBooks))
    axios
      .get("http://localhost:3000/books")
      .then((res) => {
        const fetchedBooks = res.data;
         console.log(fetchedBooks);
         setUserBooks(res.data)
        dispatch(setBooks(fetchedBooks));
      })
      .catch((err) => console.log(err));
  };

let bookList = userbooks.map(book => {
  return(
    <li>{book.title}</li>
  )
})
  
let [userCategories, setUserCategories] = useState([])

  // fetch categories
  const getCategories = () => {
    axios.get("http://localhost:3000/categories").then((res) => {
      const fetchedCategories = res.data;
      setUserCategories(res.data)
      //  console.log(res.data["books"])
        console.log(fetchedCategories);
    });
  };

  let[currentCategory, setCurrentCategory] = useState("")

  userCategories.map((category)=>{
      console.log(category.books.title)
  })

   //console.log(userCategories)

 let fantasyBooksList = userCategories.filter((category) => {return category.genre === "Fantasy"});

 //console.log(fantasyBooksList.books)


 let fantasyBooks = fantasyBooksList[0];
  //console.log(fantasyBooks)

 let fantasyList = fantasyBooksList.map(item => {
  return(
    <li>{item.title}</li>
  )
})

  let categoriesList = userCategories.map(item => {
    return(
      <li>{item.genre}</li>
      
    )
  })


  useEffect(() => {
    getBooks();
    getCategories();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
        <Tab onClick={()=>{}} label="All" value="all" />
        <Tab onClick={()=>{}} label="Fiction" value="fiction" />
        <Tab onClick={()=>{}} label="Thrillers" value="thriller" />
        <Tab onClick={()=>{}} label="Adult" value="adult" />
      </Tabs>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {/* {value === "all" &&
          books.map((book) => <BookCard book={book} key={book.id} />)} */
          <ul>
            
            {categoriesList}
          </ul>
          }
      </Box>
    </Box>
  );
};

export default BookList;