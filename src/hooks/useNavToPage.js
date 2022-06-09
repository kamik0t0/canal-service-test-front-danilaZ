import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPageAction } from "../redux/page-reducer.js";

export const useNavToPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const navToPage = (event) => {
        const page = event.target.innerHTML;
        dispatch(setPageAction(page));
        navigate(`${page}`);
    };
    return navToPage;
};
