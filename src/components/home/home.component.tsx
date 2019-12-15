import React from 'react';
// import { LoginService } from './login.service';
import { RouteComponentProps } from 'react-router';
import { Row, Col } from 'react-bootstrap';
import "./home.style.css"
import { HomeService } from './home.service';
import { SearchResponse, Result } from "./home.types";
export default class Home extends React.Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props);
        this.state = {
            searchText: "",
            results: null
        }
    }

    async search(event: any) {
        event.preventDefault();
        const { searchText } = this.state;
        const searchTextTrimmed = searchText.trim();
        // check for the emptied value
        if (!searchTextTrimmed.trim().length) {
            alert("please enter search text");
            return;
        }
        const results: Result[] = await HomeService.search(searchTextTrimmed);
        if (typeof results !== "string") {
            results.forEach(result=>{
                result.creation= this.created(result.created);
            })
            this.setState({ results });
        } else {
            alert(results);
        }
    }

    created(created: Date){
        const creation = new Date(created);
        return new Number((new Date().getTime() - creation.getTime()) / 31536000000).toFixed(0);
    }

    sort(value: string){
        if(value === "Asc"){
            this.sortAscending();
        }else if(value === "Desc"){
            this.sortDescending();
        }else{
            this.sortAscending();
        }
    }

    sortAscending(){
        const {results} = this.state;
        if(results){
           const re = results.sort((a,b)=>{
                return a.id > b.id ? 1 : b.id > a.id ? -1 : 0;
            })
           this.setState({results:re});
        }
        
    }

    sortDescending(){
        const {results} = this.state;
        if(results){
           const re = results.sort((a,b)=>{
                return a.id > b.id ? -1 : b.id > a.id ? 1 : 0;
            })
           this.setState({results:re});
        }
    }

    render() {
        const { results } = this.state;
        return (
            <div>
                <form onSubmit={ (event) => { this.search(event) }}>
                <Row className="margin20">
                    
                    <Col xs={12} md={4} className="marginBottom10">
                        <div>Search by Name</div>
                        <input placeholder="search" onChange={(event) => this.setState({ searchText: event.target.value })} />
                        <span><button type={"submit"}> Search</button></span>
                    </Col>
                    <Col xs={12} md={{ span: 2, offset: 6 }} className="marginBottom10">
                        <select onChange={(event)=> this.sort(event.target.value)}>
                            <option value="none">Sort By Id</option>
                            <option value="Asc">Ascending</option>
                            <option value="Desc">Descending</option>
                        </select>
                    </Col>
                </Row>      
                </form>

                <Row>
                    {
                        results ? results.map((result) => {
                            return (
                                <Col key={result.id} xs={6} sm={6} md={3} lg={3}>
                                    <div className="mainCharaterDiv">
                                        <div className="characterDiv">
                                            <div className="imageDiv">
                                                <div>
                                                <img className="image" src={result.image} />
                                                </div>
                                               
                                                <div className="name">
                                                    <h2>{result.name}</h2>
                                                    <p> id:{result.id} , created {result.creation} years ago</p>
                                                </div>
                                            </div>
                                            <div className="detailsInfo">
                                                <div className="detailsDiv">
                                                    <span>STATUS</span>
                                                    <p>{result.status}</p>
                                                </div>
                                                <div className="detailsDiv">
                                                    <span>SPECIES</span>
                                                    <p>{result.species}</p>
                                                </div>
                                                <div className="detailsDiv">
                                                    <span>GENDER</span>
                                                    <p>{result.gender}</p>
                                                </div>
                                                <div className="detailsDiv">
                                                    <span>ORIGIN</span>
                                                    <p>{result.origin.name}</p>
                                                </div>
                                                <div className="detailsDiv">
                                                    <span>LAST LOCATION</span>
                                                    <p>{result.location.name}</p>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </Col>

                            )
                        }) : null
                    }

                </Row>
            </div>
        )
    }
}

interface HomeProps extends RouteComponentProps {

}

interface HomeState {
    searchText: string;
    results: null | Result[]
}