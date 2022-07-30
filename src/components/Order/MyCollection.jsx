import { useEffect, useState } from 'react';
import { myOrders, clearErrors } from '../../actions/orderAction';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Layouts/Loader';
import { useSnackbar } from 'notistack';
import OrderItem from './OrderItem';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import SearchIcon from '@mui/icons-material/Search';
import MinCategory from '../Layouts/MinCategory';
import MetaData from '../Layouts/MetaData';
import bronze from '../../assets/images/nfts/bronze.jpeg'
import silver from '../../assets/images/nfts/silver.jpg'
import gold from '../../assets/images/nfts/gold.png'
import diamond from '../../assets/images/nfts/diamond.png'
import { Link } from 'react-router-dom';
import Sidebar from '../User/Sidebar';
const orderStatus = ["Processing", "Shipped", "Delivered"];
const dt = new Date();
const ordertime = [dt.getMonth(), dt.getFullYear() - 1, dt.getFullYear() - 2];

const MyCollection = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const [status, setStatus] = useState("");
    const [orderTime, setOrderTime] = useState(0);
    const [search, setSearch] = useState("");
    const [filteredOrders, setFilteredOrders] = useState([]);

    const { orders, loading, error } = useSelector((state) => state.myOrders);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        dispatch(myOrders());
    }, [dispatch, error, enqueueSnackbar]);

    useEffect(() => {
        if (loading === false) {
            setFilteredOrders(orders);
        }
    }, [loading, orders]);


    useEffect(() => {
        setSearch("");
        // console.log(status);
        // console.log(typeof orderTime);
        // console.log(orderTime);

        if (!status && +orderTime === 0) {
            setFilteredOrders(orders);
            return;
        }

        if (status && orderTime) {
            if (+orderTime === dt.getMonth()) {
                const filteredArr = orders.filter((order) => order.orderStatus === status &&
                    new Date(order.createdAt).getMonth() === +orderTime
                );
                setFilteredOrders(filteredArr);
            } else {
                const filteredArr = orders.filter((order) => order.orderStatus === status &&
                    new Date(order.createdAt).getFullYear() === +orderTime
                );
                setFilteredOrders(filteredArr);
            }
        } else if (!status) {
            if (+orderTime === dt.getMonth()) {
                const filteredArr = orders.filter((order) =>
                    new Date(order.createdAt).getMonth() === +orderTime
                );
                setFilteredOrders(filteredArr);
            } else {
                const filteredArr = orders.filter((order) =>
                    new Date(order.createdAt).getFullYear() === +orderTime
                );
                setFilteredOrders(filteredArr);
            }
        } else {
            const filteredArr = orders.filter((order) => order.orderStatus === status);
            setFilteredOrders(filteredArr);
        }
        // eslint-disable-next-line
    }, [status, orderTime]);

    const searchOrders = (e) => {
        e.preventDefault();
        if (!search.trim()) {
            enqueueSnackbar("Empty Input", { variant: "warning" });
            return;
        }
        const arr = orders.map((el) => ({
            ...el,
            orderItems: el.orderItems.filter((order) =>
                order.name.toLowerCase().includes(search.toLowerCase()))
        }));
        setFilteredOrders(arr);
    }

    const clearFilters = () => {
        setStatus("");
        setOrderTime(0);
    }

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
                                            <img draggable="false" className="w-full h-full object-contain" src={bronze} alt="" />
                                        </div>
                                        <h2 className="text-sm mt-4 group-hover:text-primary-blue text-left">Bronze Ape</h2>
                                        <h2 className="text-sm mt-4 group-hover:text-primary-blue text-left">You Own: 3</h2>
                                    </Link>
                                </div>
                                <div className="flex flex-col items-start gap-2 px-4 py-6 relative hover:shadow-lg rounded-sm">
                                    {/* <!-- image & product title --> */}
                                    <Link to='/collection' className="flex flex-col items-center text-center group">
                                        <div className="w-45 h-50">
                                            <img draggable="false" className="w-full h-full object-contain" src={silver} alt="" />
                                        </div>
                                        <h2 className="text-sm mt-4 group-hover:text-primary-blue text-left">Silver Ape</h2>
                                        <h2 className="text-sm mt-4 group-hover:text-primary-blue text-left">You Own: 4</h2>
                                    </Link>
                                </div>
                                <div className="flex flex-col items-start gap-2 px-4 py-6 relative hover:shadow-lg rounded-sm">
                                    {/* <!-- image & product title --> */}
                                    <Link to='/collection' className="flex flex-col items-center text-center group">
                                        <div className="w-45 h-50">
                                            <img draggable="false" className="w-full h-full object-contain" src={gold} alt="" />
                                        </div>
                                        <h2 className="text-sm mt-4 group-hover:text-primary-blue text-left">Gold Ape</h2>
                                        <h2 className="text-sm mt-4 group-hover:text-primary-blue text-left">You Own: 5</h2>
                                    </Link>
                                </div>
                                <div className="flex flex-col items-start gap-2 px-4 py-6 relative hover:shadow-lg rounded-sm">
                                    {/* <!-- image & product title --> */}
                                    <Link to='/collection' className="flex flex-col items-center text-center group">
                                        <div className="w-45 h-50">
                                            <img draggable="false" className="w-full h-full object-contain" src={diamond} alt="" />
                                        </div>
                                        <h2 className="text-sm mt-4 group-hover:text-primary-blue text-left">Diamond Ape</h2>
                                        <h2 className="text-sm mt-4 group-hover:text-primary-blue text-left">You Own: 2</h2>
                                    </Link>
                                </div>
                            </div>

                                {/* <!-- searchbar --> */}
                                {/* <form onSubmit={searchOrders} className="flex items-center justify-between mx-1 sm:mx-0 sm:w-10/12 bg-white border rounded hover:shadow">
                                    <input value={search} onChange={(e) => setSearch(e.target.value)} type="search" name="search" placeholder="Search your orders here" className="p-2 text-sm outline-none flex-1 rounded-l" />
                                    <button type="submit" className="h-full text-sm px-1 sm:px-4 py-2.5 text-white bg-primary-blue hover:bg-blue-600 rounded-r flex items-center gap-1">
                                        <SearchIcon sx={{ fontSize: "22px" }} />
                                        Search Orders
                                    </button>
                                </form> */}
                                {/* <!-- searchbar --> */}

                                {/* {orders && filteredOrders.length === 0 && (
                                    <div className="flex items-center flex-col gap-2 p-8 bg-white">
                                        <img draggable="false" src="https://rukminim1.flixcart.com/www/100/100/promos/23/08/2020/c5f14d2a-2431-4a36-b6cb-8b5b5e283d4f.png" alt="Empty Orders" />
                                        <span className="text-lg font-medium">Sorry, no results found</span>
                                        <p>Edit search or clear all filters</p>
                                    </div>
                                )} */}
{/* 
                                {orders && filteredOrders.map((order) => {

                                    const { _id, orderStatus, orderItems, createdAt, deliveredAt } = order;

                                    return (
                                        orderItems.map((item, index) => (
                                            <OrderItem {...item} key={index} orderId={_id} orderStatus={orderStatus} createdAt={createdAt} deliveredAt={deliveredAt} />
                                        ))
                                    )
                                }).reverse()} */}
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
