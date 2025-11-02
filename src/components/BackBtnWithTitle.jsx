import { ArrowLeftIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const BackBtnWithTitle = ({title}) => {
    const navigate = useNavigate();
  return (
    <div className="px-6 py-8 flex items-center gap-4">
      <div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="bg-base-300 py-2 px-4 rounded-full shadow-md shadow-secondary/20 flex items-center gap-0.5 hover:text-secondary hover:shadow-lg transition duration-200 btn btn-outline btn-secondary"
        >
          <ArrowLeftIcon className="h-4 w-4" /> Back
        </button>
      </div>
      <h3 className="text-2xl text-primary font-semibold">{title}</h3>
    </div>
  );
};

export default BackBtnWithTitle;
