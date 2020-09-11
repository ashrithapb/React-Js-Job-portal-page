import React, { useState, useEffect } from 'react';
import Data from './data.json';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Job() {
	const [search, setSearch] = useState('');
	const [jobData, setJobData] = useState([]);
	const [searchTag, setSearchTag] = useState([]);
	useEffect(() => {
		setJobData(
			Data.map((data) => {
				return {
					id: data.id,
					company: data.company,
					logo: data.logo,
					new: data.new,
					featured: data.featured,
					position: data.position,
					postedAt: data.postedAt,
					contract: data.contract,
					location: data.contract,
					role: data.role,
					level: data.level,
					languages: data.languages,
					tools: data.tools,
					searchTag: [data.role, data.level, data.languages, data.tools],
				};
			})
		);
		/*setSearchTag(
			jobData.map((data) => {
				return {
					role: data.role,
					level: data.level,
					languages: data.languages,
					tools: data.tools,
				};
			})
		);*/
	}, []);
	const filterTech = jobData.filter((data) => {
		for (let i = 0; i < search.length; i++) {
			let istrue = data.searchTag.toString().toLowerCase().includes(search[i]);
			if (!istrue) return false;
		}
		return true;
	});
	const searchJob = (e) => {
		setSearchTag([...searchTag, e.target.value.toLowerCase()]);
		setSearch([...search, e.target.value.toLowerCase()]);
		//alert(e.target.value.toLowerCase());
	};
	return (
		<div>
			<div className="header"></div>
			<input type="text" className="search-bar" value={search} onChange={(e) => setSearch(e.target.value)} />
			{filterTech.map((data) => {
				//console.log(data.searchTag);
				return (
					<Container key={data.id}>
						<Card>
							<Card.Body>
								<Row>
									<Col sm={2}>
										<img src={data.logo} alt="logo" />
									</Col>
									<Col sm={5}>
										<div className="properties">
											<span className="company">{data.company}</span>
											{data.new === true ? <span className="new"> NEW! </span> : ''}
											{data.featured === true ? <span className="featured"> FEATURED </span> : ''}
										</div>
										<div className="title">
											<span className="dark-gray"></span>
											{data.position}
										</div>
										<div className="details">
											<span className="mr-2 light-gray">{data.postedAt}</span>
											<span className="mr-2 list-point light-gray">{data.contract}</span>
											<span className="mr-2 list-point light-gray">{data.location}</span>
										</div>
									</Col>
									<Col sm={5} className="description">
										<div>
											<button
												className="light-box"
												value={data.role}
												onClick={(e) => searchJob(e)}
											>
												{data.role}
											</button>
											<button
												className="light-box"
												value={data.level}
												onClick={(e) => searchJob(e)}
											>
												{data.level}
											</button>
											{data.languages.map((language) => (
												<button
													className="light-box"
													key={language}
													value={language}
													onClick={(e) => searchJob(e)}
												>
													{language}
												</button>
											))}
											{data.tools.map((tool) => (
												<button
													className="light-box"
													key={tool}
													value={data.tool}
													onClick={(e) => searchJob(e)}
												>
													{tool}
												</button>
											))}
										</div>
									</Col>
								</Row>
							</Card.Body>
						</Card>
					</Container>
				);
			})}
		</div>
	);
}

export default Job;
