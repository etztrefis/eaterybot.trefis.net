import styled from "styled-components";

const Card = styled.div`
	box-sizing: border-box;
	max-width: 410px;
	margin: 0 auto;
	padding: 02px 2rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: white;
	border-radius: 7px;

	-webkit-box-shadow: 3px 3px 20px 0px rgba(0, 0, 0, 0.75);
	-moz-box-shadow: 3px 3px 20px 0px rgba(0, 0, 0, 0.75);
	box-shadow: 3px 3px 20px 0px rgba(0, 0, 0, 0.75);
`;

const Form = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const Input = styled.input`
	padding: 1rem;
	margin: 10px;
	border: 1px solid #ccc;
	-webkit-transition: 0.5s;
	transition: 0.5s;
	outline: none;
	margin-bottom: 1rem;
	font-size: 0.8rem;
`;

const Button = styled.button`
	background: linear-gradient(to bottom, #6371c7, #5563c1);
	border-color: #3f4eae;
	border-radius: 3px;
	padding: 1rem;
	color: white;
	font-weight: 700;
	width: 100%;
	margin-bottom: 1rem;
	margin-top: 15px;
	font-size: 0.8rem;
`;

const Logo = styled.img`
	width: 25%;
	height: 25%;
	margin-bottom: 1rem;
	padding-top: 30px;
`;

const Text = styled.p`
	width: 100%;
	margin-bottom: 1rem;
	text-align: center;
`;

const Header = styled.h4`
	width: 80%;
	margin-bottom: 1rem;
	text-align: center;
`;

const Error = styled.div``;
const Success = styled.div``;

export { Form, Input, Button, Logo, Card, Error, Text, Header, Success };
