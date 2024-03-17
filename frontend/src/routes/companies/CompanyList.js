import React, { useState, useEffect } from "react";
import JoblyApi from "../../api/api";
import CompanyCard from "./CompanyCard";
import LoadingSpinner from "../../common/LoadingSpinner";
import SearchForm from "../../common/SearchForm";

function CompanyList() {
    const [companies, setCompanies] = useState(null);

    useEffect(function getCompanies() {
        search();
    }, []);

    async function search(name) {
        let companies = await JoblyApi.getCompanies(name);
        setCompanies(companies);
    }

    if (!companies) return <LoadingSpinner />;

    return (
        <div className="CompanyList">
            <SearchForm searchFor={search} />
            {companies.length ? (
                <div className="CompanyList-list">
                    {companies.map(c => <CompanyCard
                          key={c.handle}
                          handle={c.handle}
                          name={c.name}
                          description={c.description}
                          logoUrl={c.logoUrl}
                      />)}
                </div>
            ) : (<p>Sorry, no results were found.</p>)}
        </div>
    )
}

export default CompanyList;