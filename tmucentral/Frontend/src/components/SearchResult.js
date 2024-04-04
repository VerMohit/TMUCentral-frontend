// import React, { useEffect, useState } from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import AdCard from './AdCard';
// import './AdDisplayCard.css';
// import { useAuth } from "../contexts/AuthContext"
// import { useParams } from 'react-router-dom';
// import { Link, useNavigate } from 'react-router-dom';
// import NavBar from './NavBar';
// import CategorySidebar from './CategorySidebar';

// const SearchResult = () => {
//     const navigate = useNavigate()
//     const [ads, setAds] = useState([]);
//     const categories = [
//         { name: "All" },
//         { name: "Academic Services" },
//         { name: "Items for Sale" },
//         { name: "Items Wanted" }
//     ];
//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const [selectedPriceRange, setSelectedPriceRange] = useState("");
//     let { title, location, category, fromPrice, toPrice } = useParams();
//     const [alertShown, setAlertShown] = useState(false);

//     const handleSelectCategory = (category) => {
//         setSelectedCategory(category);
//     };

//     const onSelectPriceRange = (priceRange) => {
//         setSelectedPriceRange(priceRange);
//     }

//     useEffect(() => {
//         const fetchData = async () => {
//             const PORT = process.env.PORT || 3005;
//             const url = `http://localhost:${PORT}/api/database/searchAds`;

//             try {
//                 const response = await fetch(url, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         title: title,
//                         location: location,
//                         category: category,
//                         fromPrice: fromPrice,
//                         toPrice: toPrice
//                     }),
//                 });

//                 if (!response.ok) {
//                     // alert("No ads found")
//                     // navigate("/");
//                     // alert("No ads found")
//                     throw new Error("Network response was not okay");

//                 }

//                 const data = await response.json();

//                 if (data && data.Ad) {
//                     setAds(data.Ad);
//                 } else {
//                     console.error("No ads found");
//                     // alert("No ads found");
//                     // navigate("/");
//                 }
//             } catch (err) {
//                 console.error(err);
//                 if (!alertShown) { // Only show alert if it hasn't been shown before
//                     setAlertShown(true); // Mark the alert as shown
//                     alert("No ads found TEST");
//                 }
//                 // alert("No ads found");
//                 navigate("/");
//             }
//         };

//         fetchData();
//     }, [title, category, fromPrice, toPrice]);

//     return (
//         <div>
//             <NavBar></NavBar>


//             <Container className="ad-grid-container">
//                 <Row>
//                     {/* <Col md={3}>
//                         <CategorySidebar
//                             categories={categories}
//                             onSelectCategory={handleSelectCategory}
//                             onSelectPriceRange={onSelectPriceRange}
//                         />
//                     </Col> */}
//                     {/* <Col md={9}>
//                         <Row> */}
//                             {ads.map((ad) => (
//                                 <Col sm={6} lg={4} xl={3} key={ad._id}> {/* Adjust the size props as needed */}
//                                     <Link to={`/ad/${ad._id}`} style={{ textDecoration: 'none' }}>
//                                         <AdCard
//                                             price={ad.price}
//                                             title={ad.title}
//                                             description={ad.description}
//                                             image={ad.image}
//                                             postDate={ad.postDate}
//                                             location={ad.location}
//                                         />
//                                     </Link>
//                                 </Col>
//                             ))}
//                         {/* </Row>
//                     </Col> */}
//                 </Row>
//             </Container>
//         </div>
//     );
// };

// export default SearchResult;
















import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AdCard from './AdCard';
import CategorySidebar from './CategorySidebar';
import { Link, useParams, useNavigate } from 'react-router-dom'
import './AdDisplayCard.css';
// import { useParams, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
// import { Link, useNavigate } from 'react-router-dom';

const SearchResult = ({ onFormSubmit }) => {
    const navigate = useNavigate()
    const [ads, setAds] = useState([]);
    let { title, location, category, fromPrice, toPrice } = useParams();
    //const [selectedCategory, setSelectedCategory] = useState(null);
    const categories = [
        { name: "All" },
        { name: "Academic Services" },
        { name: "Items for Sale" },
        { name: "Items Wanted" }
    ];
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedPriceRange, setSelectedPriceRange] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const PORT = process.env.PORT || 3005;
            const url = `http://localhost:${PORT}/api/database/searchAds`;

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title: title,
                        location: location,
                    }),
                });

                if (!response.ok) {
                    // throw new Error("Network response was not okay");
                }
                const data = await response.json();
                if (data && data.Ad) {
                    setAds(data.Ad);
                } else {
                    console.error("No ads found");
                    alert("No ads found");
                    navigate("/");
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
    };

    const onSelectPriceRange = (priceRange) => {
        setSelectedPriceRange(priceRange);
    }

    // Helper function to parse price range and filter ads
    const filterAdsByPrice = (ads, priceRange) => {
        if (!priceRange) return ads; // No filter applied
        // print all category inside ads
        console.log(ads);

        const [minPrice, maxPrice] = priceRange.split('-').map(Number);
        return ads.filter(ad => {
            const price = Number(ad.price); // Ensure the price is a number
            // Filter logic
            return price >= minPrice && (maxPrice ? price <= maxPrice : true);
        });
    };

    const filterAdsByCategory = (ads, selectedCategoryName) => {
        if (!selectedCategoryName || selectedCategoryName === "All") return ads;
        return ads.filter(ad => {
            return ad.category.includes(selectedCategoryName);
        });
    };


    const filteredAds = filterAdsByCategory(filterAdsByPrice(ads, selectedPriceRange), selectedCategory);

    if (!ads) {
        return <div>Loading...</div>;
    }

    return (
        <div>
        <NavBar></NavBar> <br></br>
        <Container className="ad-grid-container">
            <Row>
                <Col md={3}>
                    <CategorySidebar
                        categories={categories}
                        onSelectCategory={handleSelectCategory}
                        onSelectPriceRange={onSelectPriceRange}
                    />
                </Col>
                <Col md={9}>
                    <Row> {/* Start of Ad Cards Grid */}
                        {console.log}
                        {filteredAds.map((ad) => (

                            <Col sm={6} lg={4} xl={3} key={ad._id}> {/* Adjust the size props as needed */}
                                <Link to={`/ad/${ad._id}`} style={{ textDecoration: 'none' }}>
                                    <AdCard
                                        price={ad.price}
                                        title={ad.title}
                                        description={ad.description}
                                        image={ad.image}
                                        postDate={ad.postDate}
                                        location={ad.location}
                                    />
                                </Link>
                            </Col>
                        ))}

                    </Row>
                </Col>
            </Row>
        </Container>
        </div>
    );
};

export default SearchResult;