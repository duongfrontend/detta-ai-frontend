// @ts-nocheck
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";
import { Modal } from "antd";

const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(
          "https://detta-ai.onrender.com/api/v1/dalle",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: form.prompt,
            }),
          }
        );

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Vui lòng nhập đủ thông tin trước khi chọn ảnh. Xin cảm ơn");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch(
          "https://detta-ai.onrender.com/api/v1/post",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...form }),
          }
        );

        await response.json();
        alert("Xin chúc mừng. Bài viết của bạn đã được chia sẻ thành công");
        navigate("/");
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Hãy chọn hình ảnh của bạn trước khi chia sẻ nó với mọi người.");
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#d6d6d6] text-[32px]">
          Tạo Mới Bài Đăng
        </h1>
        <p className="mt-2 text-[#b6b6b6] text-[14px] max-w-[500px]">
          Hãy tạo ra những hình ảnh ngẫu nhiên từ hệ thống của chúng tôi và chia
          sẻ nó với mọi người bạn nhé
        </p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Họ Và Tên"
            type="text"
            name="name"
            placeholder="ví dụ: Đặng Hoàng Dương"
            value={form.name}
            handleChange={handleChange}
            isSurpriseMe={undefined}
            handleSurpriseMe={undefined}
          />

          <FormField
            labelName="Nội dung"
            type="text"
            name="prompt"
            placeholder="ví dụ: Đây sẽ là bức ảnh đẹp nhất"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center">
            {generatingImg
              ? "Ảnh Đang Được Tải Vui Lòng Đợi..."
              : "Chọn Ảnh Ngẫu Nhiên"}
          </button>
        </div>
        <p className="mt-2 text-[#b6b6b6] text-[14px]">
          ** Bấm và lựa những hình ảnh bạn ưng nhất và chia sẻ nó với mọi người
          nhé. **
        </p>

        <div className="mt-10">
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center">
            {loading ? "Đang Chia Sẻ..." : "Chia Sẻ Bài Viết Của Bạn"}
          </button>
        </div>
        <p className="mt-2 text-[#b6b6b6] text-[14px]">
          ** Hãy chia sẻ với mọi người hình ảnh bạn ưng nhất. Nếu chưa hãy chọn
          lại thêm lần nữa nhé **
        </p>
      </form>
    </section>
  );
};

export default CreatePost;
