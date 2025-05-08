import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChoiceTutor from "../ChoiceTutor";
import axios from "axios";

const TutorRequest = () => {
  const navigate = useNavigate();
  const customer = localStorage.getItem("user");

  // State for form data
  const [formData, setFormData] = useState({
    customerId: JSON.parse(customer).id,
    subjectId: "",
    classId: "",
    sessionsPerWeek: 2,
    feePerSession: "",
    provinceId: "",
    districtId: "",
    wardId: "",
    addressDetail: "",
    tutorId: null,
    tutorName: "",
    schedules: [
      { dayOfWeek: 2, startTime: "18:00", endTime: "19:30" },
      { dayOfWeek: 5, startTime: "18:00", endTime: "19:30" },
    ],
  });

  // State for select options
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // New state for error messages

  // State for scheduling
  const [specificTutor, setSpecificTutor] = useState(false);

  // Fetch initial data (subjects, classes, provinces)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subjectRes, classRes, provinceRes] = await Promise.all([
          axios.get("http://localhost:8080/api/subjects/getAllSubjects"),
          axios.get("http://localhost:8080/api/classes/getAllClasses"),
          axios.get("http://localhost:8080/api/address/getAllProvinces"),
        ]);

        const subjectsData = subjectRes.data.map((s) => ({ id: s.id, name: s.name }));
        const classesData = classRes.data.map((c) => ({ id: c.id, name: c.name }));
        const provincesData = provinceRes.data.map((p) => ({ id: p.id, name: p.name }));

        setSubjects(subjectsData);
        setClasses(classesData);
        setProvinces(provincesData);

        if (provincesData.length === 0) {
          setError("Không tìm thấy tỉnh/thành phố. Vui lòng kiểm tra kết nối API.");
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching initial data:", error.response?.data || error.message);
        setError("Lỗi khi tải dữ liệu ban đầu. Vui lòng thử lại.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Load districts when province is selected
  useEffect(() => {
    if (formData.provinceId) {
      const fetchData = async () => {
        try {
          const districtsRes = await axios.get("http://localhost:8080/api/address/getAllDistricts");
          const allDistricts = districtsRes.data.map((d) => ({
            id: d.id,
            name: d.name,
            provinceId: d.provinceId,
          }));

          const filteredDistricts = allDistricts
            .filter((district) => String(district.provinceId) === String(formData.provinceId))
            .map((district) => ({ id: district.id, name: district.name }));

          setDistricts(filteredDistricts);
          setFormData((prev) => ({ ...prev, districtId: "", wardId: "" }));

          if (filteredDistricts.length === 0) {
            setError(`Không tìm thấy quận/huyện cho tỉnh ID ${formData.provinceId}.`);
          }

        } catch (error) {
          console.error("Error fetching districts:", error.response?.data || error.message);
          setError("Lỗi khi tải quận/huyện. Vui lòng thử lại.");
        }
      };
      fetchData();
    } else {
      setDistricts([]);
      setWards([]);
      setFormData((prev) => ({ ...prev, districtId: "", wardId: "" }));
    }
  }, [formData.provinceId]);

  // Load wards when district is selected
  useEffect(() => {
    if (formData.districtId) {
      const fetchData = async () => {
        try {
          const wardsRes = await axios.get("http://localhost:8080/api/address/getAllWards");
          const allWards = wardsRes.data.map((w) => ({
            id: w.id,
            name: w.name,
            districtId: w.districtId,
          }));

          const filteredWards = allWards
            .filter((ward) => String(ward.districtId) === String(formData.districtId))
            .map((ward) => ({ id: ward.id, name: ward.name }));

          setWards(filteredWards);
          setFormData((prev) => ({ ...prev, wardId: "" }));

          if (filteredWards.length === 0) {
            setError(`Không tìm thấy phường/xã cho quận ID ${formData.districtId}.`);
          }

          console.log("Wards loaded:", filteredWards); // Debug
        } catch (error) {
          console.error("Error fetching wards:", error.response?.data || error.message);
          setError("Lỗi khi tải phường/xã. Vui lòng thử lại.");
        }
      };

      fetchData();
    } else {
      setWards([]);
      setFormData((prev) => ({ ...prev, wardId: "" }));
    }
  }, [formData.districtId]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        ["subjectId", "classId", "provinceId", "districtId", "wardId"].includes(name)
          ? value // Store as string, convert in handleSubmit
          : name === "sessionsPerWeek"
          ? parseInt(value) || 2
          : name === "feePerSession"
          ? value
          : value,
    });
    setError(null); // Clear error on change
  };

  // Handle schedule changes
  const handleScheduleChange = (index, field, value) => {
    const newSchedule = [...formData.schedules];
    newSchedule[index] = { ...newSchedule[index], [field]: value };

    if (field === "endTime" && newSchedule[index].startTime >= value) {
      alert("Giờ kết thúc phải sau giờ bắt đầu");
      return;
    }

    if (field === "dayOfWeek") {
      newSchedule[index][field] = parseInt(value);
    }

    setFormData({
      ...formData,
      schedules: newSchedule,
    });
  };

  // Add a new schedule item
  const addScheduleItem = () => {
    if (formData.schedules.length >= 5) {
      alert("Tối đa 5 lịch học");
      return;
    }
    setFormData({
      ...formData,
      schedules: [...formData.schedules, { dayOfWeek: 2, startTime: "18:00", endTime: "19:30" }],
    });
  };

  // Remove a schedule item
  const removeScheduleItem = (index) => {
    if (formData.schedules.length <= 1) {
      alert("Yêu cầu ít nhất một lịch học");
      return;
    }
    const newSchedule = [...formData.schedules];
    newSchedule.splice(index, 1);
    setFormData({
      ...formData,
      schedules: newSchedule,
    });
  };

  // Handle tutor type change
  const handleTutorTypeChange = (e) => {
    const value = e.target.value;
    setSpecificTutor(value === "specific");
    if (value !== "specific") {
      setFormData({
        ...formData,
        tutorId: null,
        tutorName: "",
      });
    }
  };

  // Handle tutor selection
  const handleSelectTutor = (tutorId, tutorName) => {
    setFormData({
      ...formData,
      tutorId: parseInt(tutorId) || null,
      tutorName: tutorName,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        customerId: parseInt(formData.customerId),
        subjectId: parseInt(formData.subjectId) || null,
        classId: parseInt(formData.classId) || null,
        provinceId: parseInt(formData.provinceId) || null,
        districtId: parseInt(formData.districtId) || null,
        wardId: parseInt(formData.wardId) || null,
        sessionsPerWeek: parseInt(formData.sessionsPerWeek),
        tutorId: formData.tutorId ? parseInt(formData.tutorId) : null,
      };

      console.log("Submitting payload:", payload);

      const submitres = await axios.post("http://localhost:8080/api/customers/tutoringRequest", payload);
      console.log("Form submitted successfully:", submitres.data);
      navigate("/customer");
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error.message);
      setError("Lỗi khi gửi yêu cầu. Vui lòng kiểm tra dữ liệu và thử lại.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-80">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="ml-3">Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Tạo yêu cầu gia sư mới</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Thông tin khóa học</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Môn học <span className="text-red-500">*</span>
              </label>
              <select
                name="subjectId"
                value={formData.subjectId}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
              >
                <option value="">Chọn môn học</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lớp <span className="text-red-500">*</span>
              </label>
              <select
                name="classId"
                value={formData.classId}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
              >
                <option value="">Chọn lớp</option>
                {classes.map((classItem) => (
                  <option key={classItem.id} value={classItem.id}>
                    {classItem.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số buổi học mỗi tuần <span className="text-red-500">*</span>
              </label>
              <select
                name="sessionsPerWeek"
                value={formData.sessionsPerWeek}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
              >
                <option value="1">1 buổi</option>
                <option value="2">2 buổi</option>
                <option value="3">3 buổi</option>
                <option value="4">4 buổi</option>
                <option value="5">5 buổi</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Học phí đề xuất (VNĐ/buổi) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="feePerSession"
                value={formData.feePerSession}
                onChange={handleChange}
                placeholder="Ví dụ: 150000"
                required
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Lịch học</h2>
          <p className="text-sm text-gray-600 mb-4">Vui lòng chọn thời gian học trong tuần</p>

          {formData.schedules.map((item, index) => (
            <div key={index} className="flex flex-wrap items-center gap-4 mb-4">
              <div className="w-full md:w-auto">
                <label className="block text-sm font-medium text-gray-700 mb-1">Thứ</label>
                <select
                  value={item.dayOfWeek}
                  onChange={(e) => handleScheduleChange(index, "dayOfWeek", e.target.value)}
                  className="w-full md:w-36 border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
                >
                  <option value="2">Thứ Hai</option>
                  <option value="3">Thứ Ba</option>
                  <option value="4">Thứ Tư</option>
                  <option value="5">Thứ Năm</option>
                  <option value="6">Thứ Sáu</option>
                  <option value="7">Thứ Bảy</option>
                  <option value="1">Chủ Nhật</option>
                </select>
              </div>

              <div className="w-full md:w-auto">
                <label className="block text-sm font-medium text-gray-700 mb-1">Giờ bắt đầu</label>
                <input
                  type="time"
                  value={item.startTime}
                  onChange={(e) => handleScheduleChange(index, "startTime", e.target.value)}
                  className="w-full md:w-36 border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div className="w-full md:w-auto">
                <label className="block text-sm font-medium text-gray-700 mb-1">Giờ kết thúc</label>
                <input
                  type="time"
                  value={item.endTime}
                  onChange={(e) => handleScheduleChange(index, "endTime", e.target.value)}
                  className="w-full md:w-36 border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
                />
              </div>

              {formData.schedules.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeScheduleItem(index)}
                  className="mt-5 text-red-500 hover:text-red-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              )}
            </div>
          ))}

          {formData.schedules.length < 5 && (
            <button
              type="button"
              onClick={addScheduleItem}
              className="flex items-center text-primary hover:text-primary-dark"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Thêm lịch học
            </button>
          )}
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Địa chỉ học</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tỉnh/Thành phố <span className="text-red-500">*</span>
              </label>
              <select
                name="provinceId"
                value={formData.provinceId}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
              >
                <option value="">Chọn Tỉnh/Thành phố</option>
                {provinces.map((province) => (
                  <option key={province.id} value={province.id}>
                    {province.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quận/Huyện <span className="text-red-500">*</span>
              </label>
              <select
                name="districtId"
                value={formData.districtId}
                onChange={handleChange}
                required
                disabled={!formData.provinceId || districts.length === 0}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
              >
                <option value="">Chọn Quận/Huyện</option>
                {districts.map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phường/Xã <span className="text-red-500">*</span>
              </label>
              <select
                name="wardId"
                value={formData.wardId}
                onChange={handleChange}
                required
                disabled={!formData.districtId || wards.length === 0}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
              >
                <option value="">Chọn Phường/Xã</option>
                {wards.map((ward) => (
                  <option key={ward.id} value={ward.id}>
                    {ward.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Địa chỉ chi tiết <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="addressDetail"
              value={formData.addressDetail}
              onChange={handleChange}
              placeholder="Số nhà, tên đường, thông tin bổ sung..."
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Lựa chọn gia sư</h2>
          <div className="mb-4">
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="tutor_type"
                  value="any"
                  checked={!specificTutor}
                  onChange={handleTutorTypeChange}
                  className="form-radio h-4 w-4 text-primary"
                />
                <span className="ml-2">Để trung tâm chọn gia sư phù hợp</span>
              </label>

              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="tutor_type"
                  value="specific"
                  checked={specificTutor}
                  onChange={handleTutorTypeChange}
                  className="form-radio h-4 w-4 text-primary"
                />
                <span className="ml-2">Chọn gia sư cụ thể</span>
              </label>
            </div>
          </div>

          {specificTutor && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chọn gia sư <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-500 mb-3">
                *Lưu ý: Yêu cầu của bạn sẽ được gửi trực tiếp đến gia sư này, họ có quyền chấp nhận hoặc từ chối.
              </p>
              <ChoiceTutor onSelectTutor={handleSelectTutor} />
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={() => navigate("/customer")}
            className="mr-4 px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-6 py-2 border border-black rounded-md shadow-sm text-sm font-medium text-black bg-primary hover:bg-primary-dark"
          >
            Gửi yêu cầu
          </button>
        </div>
      </form>
    </div>
  );
};

export default TutorRequest;