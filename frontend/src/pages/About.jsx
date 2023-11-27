import React, { useEffect, useState } from 'react'
import Nav from '../component/Nav'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Footer from '../component/footer/Footer';
const About = () => {
    const { companyName } = useParams();
    const [aboutCompany, setAbout] = useState("");
    const [name, setCompanyName] = useState("");
    const [website, setCompanyWebsite] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `/api/jobs/companydata/${companyName}`;
                const { data } = await axios.get(url);
                setAbout(data.aboutCompany);
                setCompanyName(data.companyName);
                setCompanyWebsite(data.companyWebsite);


            } catch (error) {
                console.log(error);
            }
        };
        if (companyName) {
            fetchData();
        }
    }, []);
    return (
        <>
            <Nav />
            <Wrapper>
                <div className="heading">
                    <h1>{name}</h1>
                    <a href={website} > {website} </a>
                </div>
                <div className='about_section'>
                    <h3>About us</h3>
                    <div dangerouslySetInnerHTML={{ __html: aboutCompany }} />
                </div>
            </Wrapper>
            <Footer />
        </>
    )
}

export default About;

const Wrapper = styled.div`
min-height:50vh;
padding-top:50px;
.heading{
        padding:50px;
        background:#e3cff7;
        h1{
            letter-spacing:1px;
        }
        a{
            color:blue;
        }
    }
    .about_section{
        padding:50px;
    }
` 