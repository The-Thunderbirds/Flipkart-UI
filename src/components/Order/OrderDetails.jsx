import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { clearErrors, getOrderDetails } from '../../actions/orderAction';
import Loader from '../Layouts/Loader';
import TrackStepper from './TrackStepper';
import MinCategory from '../Layouts/MinCategory';
import MetaData from '../Layouts/MetaData';
import { getProductDetails } from '../../actions/productAction';
import axios from "axios";
import { MINTKART_CONTRACT_ADDRESS } from "../../constant";
import BronzeApe from '../../assets/images/nfts/bronze.jpeg';
import SilverApe from '../../assets/images/nfts/silver.jpg';
import GoldApe from '../../assets/images/nfts/gold.png';
import DiamondApe from '../../assets/images/nfts/diamond.png';

const OrderDetails = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    
    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { product } = useSelector((state) => state.productDetails);

    const [nftType, setNftType] = useState(-1);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        dispatch(getOrderDetails(params.id));
    }, [dispatch, error, params.id, enqueueSnackbar]);
    
    useEffect(() => {
        if(order && order.orderItems){
            dispatch(getProductDetails(order.orderItems[0].product));
        }
    }, [dispatch,order])

    useEffect(() => {
        const fetchNFTType = async (nftId) => {
            try {
                const response = await axios.get(`https://api.jakartanet.tzkt.io/v1/contracts/${MINTKART_CONTRACT_ADDRESS}/storage`);
                const id = response.data.warranties;
                const key = nftId;
                const { data } = await axios.get(`https://api.jakartanet.tzkt.io/v1/bigmaps/${id}/keys/${key}`);
                setNftType(data.value.type);
            } catch(e) {
                console.log(e);
            }
        }
        if(product && product.nft_id !== "") {
            fetchNFTType(product.nft_id);
        }
        return () => {};
    }, [dispatch, product])

    
    return (
        <>
            <MetaData title="Order Details | Flipkart" />

            <MinCategory />
            <main className="w-full mt-14 sm:mt-4">
                {loading ? <Loader /> : (
                    <>
                        {order && order.user && order.shippingInfo && (
                            <div className="flex flex-col gap-4 max-w-6xl mx-auto">

                                <div className="flex bg-white shadow rounded-sm min-w-full">
                                    <div className="sm:w-1/2 border-r">
                                        <div className="flex flex-col gap-3 my-8 mx-10">
                                            <h3 className="font-medium text-lg">Delivery Address</h3>
                                            <h4 className="font-medium">{order.user.name}</h4>
                                            <p className="text-sm">{`${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state} - ${order.shippingInfo.pincode}`}</p>
                                            <div className="flex gap-2 text-sm">
                                                <p className="font-medium">Email</p>
                                                <p>{order.user.email}</p>
                                            </div>
                                            <div className="flex gap-2 text-sm">
                                                <p className="font-medium">Phone Number</p>
                                                <p>{order.shippingInfo.phoneNo}</p>
                                            </div>
                                        </div>
                                    </div>
                                    {product.nft_id !== "" &&
                                    <div className="sm:w-1/2 border-r">
                                        <div className="flex flex-col gap-3 my-8 mx-10">
                                            <h3 className="font-medium text-lg">NFT Details</h3>
                                            <h4 className="font-medium">NFT ID: {product.nft_id}</h4>
                                            <p className="font-medium">NFT Type: {" "} 
                                            {nftType === "0" && "Bronze"} 
                                            {nftType === "1" && "Silver"} 
                                            {nftType === "2" && "Gold"} 
                                            {nftType === "3" && "Diamond"} 
                                            </p>
                                            <div className="w-full sm:w-32 h-32">
                                            {nftType === "0" && 
                                            <img draggable="false" className="h-full w-full object-contain" alt="nft-type" src= {BronzeApe}/>} 
                                            {nftType === "1" && 
                                            <img draggable="false" className="h-full w-full object-contain" alt="nft-type" src= {SilverApe}/>} 
                                            {nftType === "2" && 
                                            <img draggable="false" className="h-full w-full object-contain" alt="nft-type" src= {GoldApe}/>} 
                                            {nftType === "3" && 
                                            <img draggable="false" className="h-full w-full object-contain" alt="nft-type" src= {DiamondApe}/>}                                                 
                                            </div>
                                                <Link  className="text-sm text-primary-blue font-medium  cursor-pointer" to = '/'>Click here to view your NFT on the blockchain</Link>

                                        </div>
                                    </div>
                                    }
                                </div>

                                {order.orderItems && order.orderItems.map((item) => {

                                    const { _id, image, name, price, quantity } = item;

                                    return (
                                        <div className="flex flex-col sm:flex-row min-w-full shadow rounded-sm bg-white px-2 py-5" key={_id}>

                                            <div className="flex flex-col sm:flex-row sm:w-1/2 gap-2">
                                                <div className="w-full sm:w-32 h-20">
                                                    <img draggable="false" className="h-full w-full object-contain" src={image} alt={name} />
                                                </div>
                                                <div className="flex flex-col gap-1 overflow-hidden">
                                                    <p className="text-sm">{name.length > 60 ? `${name.substring(0, 60)}...` : name}</p>
                                                    <p className="text-xs text-gray-600 mt-2">Quantity: {quantity}</p>
                                                    <p className="text-xs text-gray-600">Price: ₹{price.toLocaleString()}</p>
                                                    <span className="font-medium">Total: ₹{(quantity * price).toLocaleString()}</span>
                                                </div>
                                            </div>

                                            <div className="flex flex-col w-full sm:w-1/2">
                                                <h3 className="font-medium sm:text-center">Order Status</h3>
                                                <TrackStepper
                                                    orderOn={order.createdAt}
                                                    shippedAt={order.shippedAt}
                                                    deliveredAt={order.deliveredAt}
                                                    activeStep={
                                                        order.orderStatus === "Delivered" ? 2 : order.orderStatus === "Shipped" ? 1 : 0
                                                    }
                                                />
                                            </div>

                                        </div>
                                    )
                                })
                                }
                            </div>
                        )}
                    </>
                )}
            </main>
        </>
    );
};

export default OrderDetails;
