import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Layouts/Loader';
import MinCategory from '../Layouts/MinCategory';
import MetaData from '../Layouts/MetaData';
import axios from "axios";
import { MINTKART_CONTRACT_ADDRESS } from "../../constant";
import BronzeApe from '../../assets/images/nfts/bronze.jpeg';
import SilverApe from '../../assets/images/nfts/silver.jpg';
import GoldApe from '../../assets/images/nfts/gold.png';
import DiamondApe from '../../assets/images/nfts/diamond.png';
import { Link } from 'react-router-dom';
import Sidebar from '../User/Sidebar';


const MyCollection = () => {

    const dispatch = useDispatch();

    const { user, loading } = useSelector((state) => state.user);
    const [bronze, setBronze] = useState(0);
    const [silver, setSilver] = useState(0);
    const [gold, setGold] = useState(0);
    const [diamond, setDiamond] = useState(0);

    useEffect(() => {
        const fetchAllNFTType = async (address) => {
            try {
                const response = await axios.get(`https://api.jakartanet.tzkt.io/v1/contracts/${MINTKART_CONTRACT_ADDRESS}/storage`);
                const id = response.data.rewards;
                const key = address;
                const { data } = await axios.get(`https://api.jakartanet.tzkt.io/v1/bigmaps/${id}/keys/${key}`);
                setBronze(data.value.bronze);
                setSilver(data.value.silver);
                setGold(data.value.gold);
                setDiamond(data.value.diamond);
            } catch(e) {
                console.log(e);
            }
        }
        if(user && user.public_key_hash !== "") {
            fetchAllNFTType(user.public_key_hash);
        }
        return () => {};
    }, [dispatch, user])


    return (
        <>
            <MetaData title="My Orders | Flipkart" />

            <MinCategory />
            <main className="w-full mt-16 sm:mt-0">

                {/* <!-- row --> */}
                <div className="flex gap-3.5 sm:w-11/12 sm:mt-4 m-auto mb-7">

                    {/* <!-- sidebar column  --> */}
                        <Sidebar activeTab={"collection"} />
                    {/* <!-- sidebar column  --> */}

                    {/* <!-- orders column --> */}
                    <div className="flex-1">

                        {loading ? <Loader /> : (
                            <div className="flex flex-col gap-2 pb-4 justify-center items-center w-full overflow-hidden bg-white">

                            <div className="grid grid-cols-2 2xl:grid-cols-4  w-full place-content-start overflow-hidden pb-4 border-b">
                                <div className="flex flex-col items-start gap-2 px-4 py-6 relative hover:shadow-lg rounded-sm">
                                    {/* <!-- image & product title --> */}
                                    <Link to='/collection' className="flex flex-col items-center text-center group">
                                        <div className="w-45 h-50">
                                            <img draggable="false" className="w-full h-full object-contain" src={BronzeApe} alt="" />
                                        </div>
                                        <h2 className="text-sm mt-4 group-hover:text-primary-blue text-left">Bronze Ape</h2>
                                        <h2 className="text-sm mt-4 group-hover:text-primary-blue text-left">You Own: {bronze}</h2>
                                    </Link>
                                </div>
                                <div className="flex flex-col items-start gap-2 px-4 py-6 relative hover:shadow-lg rounded-sm">
                                    {/* <!-- image & product title --> */}
                                    <Link to='/collection' className="flex flex-col items-center text-center group">
                                        <div className="w-45 h-50">
                                            <img draggable="false" className="w-full h-full object-contain" src={SilverApe} alt="" />
                                        </div>
                                        <h2 className="text-sm mt-4 group-hover:text-primary-blue text-left">Silver Ape</h2>
                                        <h2 className="text-sm mt-4 group-hover:text-primary-blue text-left">You Own: {silver}</h2>
                                    </Link>
                                </div>
                                <div className="flex flex-col items-start gap-2 px-4 py-6 relative hover:shadow-lg rounded-sm">
                                    {/* <!-- image & product title --> */}
                                    <Link to='/collection' className="flex flex-col items-center text-center group">
                                        <div className="w-45 h-50">
                                            <img draggable="false" className="w-full h-full object-contain" src={GoldApe} alt="" />
                                        </div>
                                        <h2 className="text-sm mt-4 group-hover:text-primary-blue text-left">Gold Ape</h2>
                                        <h2 className="text-sm mt-4 group-hover:text-primary-blue text-left">You Own: {gold}</h2>
                                    </Link>
                                </div>
                                <div className="flex flex-col items-start gap-2 px-4 py-6 relative hover:shadow-lg rounded-sm">
                                    {/* <!-- image & product title --> */}
                                    <Link to='/collection' className="flex flex-col items-center text-center group">
                                        <div className="w-45 h-50">
                                            <img draggable="false" className="w-full h-full object-contain" src={DiamondApe} alt="" />
                                        </div>
                                        <h2 className="text-sm mt-4 group-hover:text-primary-blue text-left">Diamond Ape</h2>
                                        <h2 className="text-sm mt-4 group-hover:text-primary-blue text-left">You Own: {diamond}</h2>
                                    </Link>
                                </div>
                            </div>

                            </div>
                        )}

                    </div>
                    {/* <!-- orders column --> */}
                </div>
                {/* <!-- row --> */}

            </main>
        </>
    );
};

export default MyCollection;
