import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CalendarIcon, ChevronRight, Loader2, Upload, X } from "lucide-react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"

// Định nghĩa các môn học và lớp học
const subjects = [
  { id: "math", label: "Toán học" },
  { id: "physics", label: "Vật lý" },
  { id: "chemistry", label: "Hóa học" },
  { id: "biology", label: "Sinh học" },
  { id: "literature", label: "Ngữ văn" },
  { id: "english", label: "Tiếng Anh" },
  { id: "history", label: "Lịch sử" },
  { id: "geography", label: "Địa lý" },
  { id: "informatics", label: "Tin học" },
]

const grades = [
  { id: "grade1", label: "Lớp 1" },
  { id: "grade2", label: "Lớp 2" },
  { id: "grade3", label: "Lớp 3" },
  { id: "grade4", label: "Lớp 4" },
  { id: "grade5", label: "Lớp 5" },
  { id: "grade6", label: "Lớp 6" },
  { id: "grade7", label: "Lớp 7" },
  { id: "grade8", label: "Lớp 8" },
  { id: "grade9", label: "Lớp 9" },
  { id: "grade10", label: "Lớp 10" },
  { id: "grade11", label: "Lớp 11" },
  { id: "grade12", label: "Lớp 12" },
  { id: "university", label: "Đại học" },
]

// Định nghĩa schema cho form
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

const formSchema = z.object({
  // Thông tin cá nhân
  fullName: z.string().min(2, { message: "Họ tên phải có ít nhất 2 ký tự" }),
  dateOfBirth: z.date({ required_error: "Vui lòng chọn ngày sinh" }),
  phone: z.string().min(10, { message: "Số điện thoại không hợp lệ" }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  citizenId: z.string().min(9, { message: "Số CCCD/CMND không hợp lệ" }),
  address: z.string().min(5, { message: "Địa chỉ phải có ít nhất 5 ký tự" }),

  // Thông tin giáo dục
  university: z.string().min(2, { message: "Vui lòng nhập tên trường" }),
  major: z.string().min(2, { message: "Vui lòng nhập chuyên ngành" }),
  academicYear: z.string().min(2, { message: "Vui lòng nhập niên khóa" }),

  // Thông tin giảng dạy
  subjects: z.array(z.string()).min(1, { message: "Vui lòng chọn ít nhất một môn học" }),
  grades: z.array(z.string()).min(1, { message: "Vui lòng chọn ít nhất một lớp" }),

  // Đồng ý điều khoản
  acceptTerms: z.boolean().refine((val) => val === true, { message: "Bạn phải đồng ý với điều khoản" }),
})

export default function TutorRegistrationForm() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [calendarOpen, setCalendarOpen] = useState(false)

  // State cho các file ảnh

  // ảnh thẻ cua người dùng
   // có tư preview là ảnh để hiện thị lên giao diện khi người dùng tải lên
  const [idPhoto, setIdPhoto] = useState(null)
  const [idPhotoPreview, setIdPhotoPreview] = useState(null)

  // ảnh CCCD mặt trước và mặt sau 
  const [citizenIdFront, setCitizenIdFront] = useState(null)
  const [citizenIdBack, setCitizenIdBack] = useState(null)
  const [citizenIdFrontPreview, setCitizenIdFrontPreview] = useState(null)
  const [citizenIdBackPreview, setCitizenIdBackPreview] = useState(null)

    // ảnh bằng cấp
  const [degreePhotos, setDegreePhotos] = useState([])
  const [degreePhotosPreviews, setDegreePhotosPreviews] = useState([])

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      citizenId: "",
      university: "",
      major: "",
      academicYear: "",
      subjects: [],
      grades: [],
      acceptTerms: false,
    },
  })

  // Xử lý tải lên ảnh thẻ
  const handleIdPhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.size > MAX_FILE_SIZE) {
        alert("Kích thước file quá lớn (tối đa 5MB)")
        return
      }
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        alert("Định dạng file không hợp lệ (chỉ chấp nhận JPG, PNG, WEBP)")
        return
      }

      setIdPhoto(file)
      setIdPhotoPreview(URL.createObjectURL(file))
    }
  }

  // Xử lý tải lên ảnh CCCD mặt trước
  const handleCitizenIdFrontChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.size > MAX_FILE_SIZE) {
        alert("Kích thước file quá lớn (tối đa 5MB)")
        return
      }
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        alert("Định dạng file không hợp lệ (chỉ chấp nhận JPG, PNG, WEBP)")
        return
      }

      setCitizenIdFront(file)
      setCitizenIdFrontPreview(URL.createObjectURL(file))
    }
  }

  // Xử lý tải lên ảnh CCCD mặt sau
  const handleCitizenIdBackChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.size > MAX_FILE_SIZE) {
        alert("Kích thước file quá lớn (tối đa 5MB)")
        return
      }
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        alert("Định dạng file không hợp lệ (chỉ chấp nhận JPG, PNG, WEBP)")
        return
      }

      setCitizenIdBack(file)
      setCitizenIdBackPreview(URL.createObjectURL(file))
    }
  }

  // Xử lý tải lên ảnh bằng cấp
  const handleDegreePhotosChange = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      const validFiles = []
      const validPreviews = []

      files.forEach((file) => {
        if (file.size > MAX_FILE_SIZE) {
          alert(`File ${file.name} có kích thước quá lớn (tối đa 5MB)`)
          return
        }
        if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
          alert(`File ${file.name} có định dạng không hợp lệ (chỉ chấp nhận JPG, PNG, WEBP)`)
          return
        }

        validFiles.push(file)
        validPreviews.push(URL.createObjectURL(file))
      })

      setDegreePhotos([...degreePhotos, ...validFiles])
      setDegreePhotosPreviews([...degreePhotosPreviews, ...validPreviews])
    }
  }

  // Xóa ảnh bằng cấp
  const removeDegreePhoto = (index) => {
    const newPhotos = [...degreePhotos]
    const newPreviews = [...degreePhotosPreviews]

    newPhotos.splice(index, 1)
    newPreviews.splice(index, 1)

    setDegreePhotos(newPhotos)
    setDegreePhotosPreviews(newPreviews)
  }

  const onSubmit = async (data) => {
    // Kiểm tra xem đã tải lên đủ ảnh chưa
    if (!idPhoto) {
      alert("Vui lòng tải lên ảnh thẻ")
      return
    }

    if (!citizenIdFront || !citizenIdBack) {
      alert("Vui lòng tải lên đầy đủ ảnh CCCD/CMND (mặt trước và mặt sau)")
      return
    }

    if (degreePhotos.length === 0) {
      alert("Vui lòng tải lên ít nhất một ảnh bằng cấp")
      return
    }

    setIsSubmitting(true)

    // Tạo FormData để gửi cả dữ liệu form và file
    const formData = new FormData()

    // Thêm dữ liệu form
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value))
      } else if (value instanceof Date) {
        formData.append(key, value.toISOString())
      } else {
        formData.append(key, String(value))
      }
    })

    // Thêm các file ảnh
    formData.append("idPhoto", idPhoto)
    formData.append("citizenIdFront", citizenIdFront)
    formData.append("citizenIdBack", citizenIdBack)

    degreePhotos.forEach((photo, index) => {
      formData.append(`degreePhoto_${index}`, photo)
    })

    // Mô phỏng gửi dữ liệu
    console.log("Form data:", data)
    console.log("Files:", {
      idPhoto,
      citizenIdFront,
      citizenIdBack,
      degreePhotos,
    })

    // Mô phỏng API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    alert("Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm.")
  }

  const nextStep = () => {
    if (step === 1) {
      form.trigger(["fullName", "dateOfBirth", "phone", "email", "citizenId", "address"])
      const personalInfoValid =
        !form.formState.errors.fullName &&
        !form.formState.errors.dateOfBirth &&
        !form.formState.errors.phone &&
        !form.formState.errors.email &&
        !form.formState.errors.citizenId &&
        !form.formState.errors.address

      if (personalInfoValid) setStep(2)
    } else if (step === 2) {
      // Kiểm tra xem đã tải lên đủ ảnh chưa
      if (!idPhoto) {
        alert("Vui lòng tải lên ảnh thẻ")
        return
      }

      if (!citizenIdFront || !citizenIdBack) {
        alert("Vui lòng tải lên đầy đủ ảnh CCCD/CMND (mặt trước và mặt sau)")
        return
      }

      if (degreePhotos.length === 0) {
        alert("Vui lòng tải lên ít nhất một ảnh bằng cấp")
        return
      }

      setStep(3)
    } else if (step === 3) {
      form.trigger(["university", "major", "academicYear"])
      const educationValid =
        !form.formState.errors.university && !form.formState.errors.major && !form.formState.errors.academicYear

      if (educationValid) setStep(4)
    }
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Đăng Ký Làm Gia Sư</CardTitle>
        <CardDescription>
          Vui lòng điền đầy đủ thông tin để đăng ký làm gia sư tại trung tâm của chúng tôi
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step === i
                  ? "bg-primary text-primary-foreground"
                  : step > i
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {i}
            </div>
          ))}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Thông tin cá nhân</h3>

                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Họ và tên</FormLabel>
                      <FormControl>
                        <Input placeholder="Nguyễn Văn A" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Ngày tháng năm sinh</FormLabel>
                      <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={`w-full pl-3 text-left font-normal ${
                                !field.value ? "text-muted-foreground" : ""
                              }`}
                            >
                              {field.value ? (
                                format(field.value, "dd/MM/yyyy", { locale: vi })
                              ) : (
                                <span>Chọn ngày sinh</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date)
                              setCalendarOpen(false)
                            }}
                            disabled={(date) => date > new Date() || date < new Date("1940-01-01")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Số điện thoại</FormLabel>
                        <FormControl>
                          <Input placeholder="0912345678" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="example@gmail.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="citizenId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số CCCD/CMND</FormLabel>
                      <FormControl>
                        <Input placeholder="0123456789" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Địa chỉ hiện tại</FormLabel>
                      <FormControl>
                        <Textarea placeholder="123 Đường ABC, Phường XYZ, Quận/Huyện, Tỉnh/Thành phố" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Tải lên hình ảnh</h3>

                {/* Ảnh thẻ */}
                <div className="space-y-2">
                  <div className="text-sm font-medium">Ảnh thẻ (1 hình)</div>
                  <div className="text-sm text-muted-foreground">
                    Tải lên 1 ảnh thẻ chân dung rõ nét, nền trắng hoặc xanh
                  </div>

                  <div className="flex flex-col items-center gap-4">
                    <div className="border border-dashed border-gray-300 rounded-lg p-4 w-full flex flex-col items-center justify-center">
                      <input
                        type="file"
                        id="idPhoto"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleIdPhotoChange}
                        className="hidden"
                      />

                      {!idPhotoPreview ? (
                        <label
                          htmlFor="idPhoto"
                          className="flex flex-col items-center justify-center w-full h-32 cursor-pointer"
                        >
                          <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                          <span className="text-sm text-muted-foreground">Nhấn để tải lên ảnh thẻ</span>
                          <span className="text-xs text-muted-foreground mt-1">JPG, PNG hoặc WEBP (tối đa 5MB)</span>
                        </label>
                      ) : (
                        <div className="relative">
                          <img
                            src={idPhotoPreview || "/placeholder.svg"}
                            alt="Ảnh thẻ"
                            className="max-h-40 rounded-md object-contain"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                            onClick={() => {
                              setIdPhoto(null)
                              setIdPhotoPreview(null)
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Ảnh CCCD */}
                <div className="space-y-2">
                  <div className="text-sm font-medium">Ảnh căn cước công dân (2 tấm)</div>
                  <div className="text-sm text-muted-foreground">Tải lên ảnh mặt trước và mặt sau của CCCD/CMND</div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Mặt trước */}
                    <div className="border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center">
                      <input
                        type="file"
                        id="citizenIdFront"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleCitizenIdFrontChange}
                        className="hidden"
                      />

                      {!citizenIdFrontPreview ? (
                        <label
                          htmlFor="citizenIdFront"
                          className="flex flex-col items-center justify-center w-full h-32 cursor-pointer"
                        >
                          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                          <span className="text-sm text-muted-foreground text-center">Mặt trước CCCD/CMND</span>
                        </label>
                      ) : (
                        <div className="relative">
                          <img
                            src={citizenIdFrontPreview || "/placeholder.svg"}
                            alt="Mặt trước CCCD"
                            className="max-h-40 rounded-md object-contain"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                            onClick={() => {
                              setCitizenIdFront(null)
                              setCitizenIdFrontPreview(null)
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Mặt sau */}
                    <div className="border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center">
                      <input
                        type="file"
                        id="citizenIdBack"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleCitizenIdBackChange}
                        className="hidden"
                      />

                      {!citizenIdBackPreview ? (
                        <label
                          htmlFor="citizenIdBack"
                          className="flex flex-col items-center justify-center w-full h-32 cursor-pointer"
                        >
                          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                          <span className="text-sm text-muted-foreground text-center">Mặt sau CCCD/CMND</span>
                        </label>
                      ) : (
                        <div className="relative">
                          <img
                            src={citizenIdBackPreview || "/placeholder.svg"}
                            alt="Mặt sau CCCD"
                            className="max-h-40 rounded-md object-contain"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                            onClick={() => {
                              setCitizenIdBack(null)
                              setCitizenIdBackPreview(null)
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Ảnh bằng cấp */}
                <div className="space-y-2">
                  <div className="text-sm font-medium">Ảnh bằng cấp (nhiều hình)</div>
                  <div className="text-sm text-muted-foreground">
                    Tải lên ảnh các bằng cấp, chứng chỉ liên quan đến việc giảng dạy
                  </div>

                  <div className="border border-dashed border-gray-300 rounded-lg p-4 w-full">
                    <input
                      type="file"
                      id="degreePhotos"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleDegreePhotosChange}
                      className="hidden"
                      multiple
                    />

                    <label
                      htmlFor="degreePhotos"
                      className="flex flex-col items-center justify-center w-full h-32 cursor-pointer"
                    >
                      <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">Nhấn để tải lên ảnh bằng cấp</span>
                      <span className="text-xs text-muted-foreground mt-1">Có thể chọn nhiều ảnh cùng lúc</span>
                    </label>

                    {degreePhotosPreviews.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                        {degreePhotosPreviews.map((preview, index) => (
                          <div key={index} className="relative">
                            <img
                              src={preview || "/placeholder.svg"}
                              alt={`Bằng cấp ${index + 1}`}
                              className="h-32 w-full rounded-md object-cover"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                              onClick={() => removeDegreePhoto(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Thông tin học vấn</h3>

                <FormField
                  control={form.control}
                  name="university"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trường đào tạo</FormLabel>
                      <FormControl>
                        <Input placeholder="Đại học Quốc gia TP.HCM" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="major"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ngành học</FormLabel>
                      <FormControl>
                        <Input placeholder="Công nghệ thông tin" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="academicYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Niên khóa</FormLabel>
                      <FormControl>
                        <Input placeholder="2020-2024" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Thông tin giảng dạy</h3>

                <FormField
                  control={form.control}
                  name="subjects"
                  render={({ field }) => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>Môn dạy</FormLabel>
                        <FormDescription>Chọn các môn học mà bạn có thể giảng dạy</FormDescription>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {subjects.map((subject) => (
                          <div key={subject.id} className="flex flex-row items-start space-x-3 space-y-0">
                            <Checkbox
                              checked={field.value?.includes(subject.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, subject.id])
                                  : field.onChange(field.value?.filter((value) => value !== subject.id))
                              }}
                              id={`subject-${subject.id}`}
                            />
                            <label
                              htmlFor={`subject-${subject.id}`}
                              className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {subject.label}
                            </label>
                          </div>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="grades"
                  render={({ field }) => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>Lớp dạy</FormLabel>
                        <FormDescription>Chọn các lớp mà bạn có thể giảng dạy</FormDescription>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {grades.map((grade) => (
                          <div key={grade.id} className="flex flex-row items-start space-x-3 space-y-0">
                            <Checkbox
                              checked={field.value?.includes(grade.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, grade.id])
                                  : field.onChange(field.value?.filter((value) => value !== grade.id))
                              }}
                              id={`grade-${grade.id}`}
                            />
                            <label
                              htmlFor={`grade-${grade.id}`}
                              className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {grade.label}
                            </label>
                          </div>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="acceptTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 mt-6">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Tôi đồng ý với các điều khoản và điều kiện</FormLabel>
                        <FormDescription>
                          Tôi xác nhận rằng tất cả thông tin cung cấp là chính xác và đồng ý với các điều khoản dịch vụ
                          của trung tâm.
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <div className="flex justify-between pt-4">
              {step > 1 ? (
                <Button type="button" variant="outline" onClick={prevStep}>
                  Quay lại
                </Button>
              ) : (
                <div></div>
              )}

              {step < 4 ? (
                <Button type="button" onClick={nextStep}>
                  Tiếp theo <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Đang xử lý
                    </>
                  ) : (
                    "Hoàn tất đăng ký"
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-6">
        <p className="text-sm text-muted-foreground">
          Nếu bạn có thắc mắc, vui lòng liên hệ với chúng tôi qua email:{" "}
          <span className="font-medium">support@tutorcenter.com</span>
        </p>
      </CardFooter>
    </Card>
  )
}
