import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { buyAsset, sellAsset } from "../../../state/slices/portfolioSlice";
import { useUser } from "@clerk/clerk-react";
import { getPortfolioAssetDetails } from "../../../api";

const BuySellModal = ({
  closeModal,
  ticker,
  handleChangePortfolioAsset,
  defaultValue,
  initialChecked,
}) => {
  const { user } = useUser();
  const dispatch = useDispatch();
  const interval = useSelector((state) => state.portfolio.interval);
  const { mode } = useSelector((state) => state.config);
  const [checked, setChecked] = React.useState(initialChecked);
  const [formState, setFormState] = useState(
    defaultValue || {
      category: "",
      ticker: "",
      price: 0,
      quantity: 0,
    }
  );
  const [quantity, setQuantity] = useState(
    formState.quantity !== 0 ? formState.quantity : 1
  );

  const [errors, setErrors] = useState("");

  const fetchPortfolioAssetDetails = async () => {
    try {
      const { data } = await getPortfolioAssetDetails(
        ticker,
        user.primaryEmailAddress.emailAddress
      );

      handleChangePortfolioAsset(data.assets[0]);
    } catch (error) {
      console.log(error.message);
    }
  };

  const validateForm = () => {
    let errorFields = [];
    for (const [key, value] of Object.entries(formState)) {
      if (!value) {
        errorFields.push(key);
      }
    }
    if (errorFields.length === 0) {
      setErrors("");
      return true;
    } else {
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const changeInput = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleClose = () => {
    closeModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = user.primaryEmailAddress.emailAddress;

    if (validateForm()) {
      closeModal();
    }

    const formData = {
      ticker: formState.ticker,
      quantity: parseInt(formState.quantity),
      price: formState.market_value,
    };

    if (checked) {
      dispatch(sellAsset(formData, email, interval));
    } else {
      dispatch(buyAsset(formData, email, interval));
    }

    fetchPortfolioAssetDetails();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
      <div className="modal bg-white dark:bg-gray-800 w-[70vh] p-6 rounded-md z-10">
        <div className="flex justify-between items-center mb-4">
          <div className="flex">
            <button
              className="text-gray-900 text-lg font-bold hover:text-gray-800"
              onClick={handleClose}
            >
              <AiOutlineClose
                fill={`${mode === "dark" ? "#ebecec" : "#000"}`}
              />
            </button>
          </div>

          <div>
            <span className="text-green-500">BUY</span>{" "}
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />{" "}
            <span className="text-red-500">SELL</span>
          </div>
        </div>
        <div>
          <p className="capitalize">{formState.category}</p>
          <h3 className="text-xl font-semibold">
            {formState.ticker}
          </h3>
        </div>
        <div className="mt-5">
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
              "& .MuiInputLabel-root": {
                color: mode === "dark" ? "white" : "initial",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor:
                    mode === "dark" ? "white" : "rgba(0, 0, 0, 0.23)",
                },
                "&:hover fieldset": {
                  borderColor:
                    mode === "dark" ? "white" : "rgba(0, 0, 0, 0.23)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: mode === "dark" ? "white" : "#3f51b5",
                },
              },
              "& .MuiOutlinedInput-input": {
                color: mode === "dark" ? "white" : "initial",
              },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              style={{ WebkitAppearance: "none", MozAppearance: "none" }}
              id="outlined-basic"
              label="Quantity"
              type="number"
              InputProps={{
                inputProps: { min: 1 },
              }}
              variant="outlined"
              defaultValue={formState.quantity}
              onChange={(e) => {
                changeInput(e);
                setQuantity(e.target.value > 0 ? e.target.value : 1);
              }}
              name="quantity"
            />
            <TextField
              id="outlined-basic"
              label="Price"
              variant="outlined"
              value={Number(quantity * formState.market_value).toFixed(2)}
              onChange={(e) => changeInput(e)}
              name="price"
              sx={{
                "& .MuiInputLabel-root": {
                  color: mode ? "white" : "initial",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor:
                      mode === "dark" ? "white" : "rgba(0, 0, 0, 0.23)",
                  },
                  "&:hover fieldset": {
                    borderColor:
                      mode === "dark" ? "white" : "rgba(0, 0, 0, 0.23)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: mode === "dark" ? "white" : "#3f51b5",
                  },
                  "& .MuiOutlinedInput-input": {
                    color: mode === "dark" ? "white" : "initial",
                  },
                },
              }}
              disabled
            />
          </Box>
        </div>
        <div
          className={`card card-border mt-4 ${
            checked
              ? "bg-red-500 dark:bg-red-500"
              : "bg-green-500 dark:bg-green-500"
          } text-center cursor-pointer hover:${
            checked
              ? "bg-red-600 dark:bg-red-300"
              : " bg-green-700 dark:bg-green-300"
          } `}
          role="presentation"
          onClick={handleSubmit}
        >
          <div className="card-body">
            <h6 className="text-">{checked ? "SELL" : "BUY"}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BuySellModal;
