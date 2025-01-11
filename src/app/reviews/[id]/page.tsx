"use client";
import Loading from "@/components/Loading";
import { addReview, fetchProduct } from "@/redux/slices/productSlice";
import { AppDispatch, RootState } from "@/redux/store";
import {  useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast, Toaster } from "sonner";

export default function Reviews() {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [review, setReview] = useState({ rating: 0, comment: "" });

  const { product, inProgressFetchSingle } = useSelector(
    (state: RootState) => state.products
  );


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (rating ==  0) {
      toast.warning("please add rating");
    } else {
      review.rating = rating;
    }

    if (review.rating && review.comment) {
      dispatch(addReview({ review, id: params.id as string }));
      toast.success("review added");
      setReview({ rating: 0, comment: "" });
      setRating(0);
    }
  };

  const arr = new Array(5).fill(0);

  useEffect(() => {
    dispatch(fetchProduct(params.id as string));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 md:py-8">
      <Toaster />
      <div className="flex flex-col-reverse items-center gap-10 md:gap-1 md:flex-row md:w-4/5 md:max-w-5xl bg-white shadow-md rounded-md p-2 md:p-6 ">
        {/* Left Section - Review Form */}
        <div className="md:w-1/2 p-1 md:pr-4 border-r border-gray-300">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Write a Review
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 my-8 flex gap-10 ">
              <label
                htmlFor="rating"
                className="block text-gray-600 font-semibold mb-2"
              >
                Rating :
              </label>

              <div className="flex justify-center gap-1 ">
                {arr.map((value, index) => (
                  <span
                    key={index}
                    className={`text-2xl cursor-pointer  ${
                      (hover == 0 && index < rating) || index < hover
                        ? "text-yellow-300"
                        : ""
                    }`}
                    onClick={() => setRating(index + 1)}
                    onMouseEnter={() => setHover(index + 1)}
                    onMouseLeave={() => setHover(0)}
                  >
                    &#9733;
                  </span>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="comment"
                className="block text-gray-600 font-semibold mb-2"
              >
                Comment
              </label>
              <textarea
                id="comment"
                rows={10}
                value={review.comment}
                onChange={(e) =>
                  setReview({ ...review, comment: e.target.value })
                }
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
                placeholder="Share your thoughts"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 px-4 rounded-full hover:bg-gray-700"
            >
              Submit Review
            </button>
          </form>
        </div>

        {/* Right Section - Product Details */}
        <div className="w-full   md:w-1/2 md:pl-4">
          {inProgressFetchSingle ? (
            <Loading />
          ) : (
            product && (
              <div className="md:p-4 bg-secondary rounded-md shadow-sm">
                <div className="mb-4 h-64">
                  <img
                    src={product.images[0]}
                    alt="Product Image"
                    className="w-full h-full object-contain rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    {product?.name}
                  </h2>
                  <p className="text-gray-600">{product?.description}</p>
                </div>
                <div className="mb-4">
                  <span className="text-lg font-semibold text-gray-800">
                    Price:{" "}
                  </span>
                  <span className="text-lg text-gray-600">
                    ${product?.price}
                  </span>
                </div>
                <div className="mb-4">
                  <span className="text-lg font-semibold text-gray-800">
                    Category:{" "}
                  </span>
                  <span className="text-lg text-gray-600">
                    {product?.category.name}
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
