import { useEffect, useState } from "react"
import Loader from "../animation/Loader";
import CompanyList from "../component/company/CompanyList";
import { getData } from "../util/api";
import HomeButton from "../component/button/HomeButton";
import BackButton from "../component/button/BackButton";

export default function Loser() {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                // const response = await axios.get('http://localhost:3000/api2/loser');
                const response = await getData('top_loser');
                const resDatas = response.data.data;

                console.log(response);
                setCompanies(resDatas);
            } catch (error) {
                console.log(error.message);
            } finally {
                console.log('request selesai');
            }
        })();
    }, []);

    return (
        <>
            <div className="main-container">
                <div className="header-container">
                    <BackButton/>
                    <h1>Daftar Saham Dengan Perubahan Harga Terendah</h1>
                    <HomeButton/>
                </div>
                <div className="content-container">
                    {
                        companies.length > 0 ? companies.map((company) => <CompanyList key={company.symbol} company={company} />) : <div className="loader-container">
                            <Loader />
                            <p>Mengambil data, mohon tunggu...</p>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
