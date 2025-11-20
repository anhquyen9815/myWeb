import { useState } from 'react';
import type { SelectChangeEvent } from '@mui/material';
import { useProductHooks } from '@/hooks/productHooks';
import { useCategoryHooks } from '@/hooks/categoryHooks';
import { useBrandHooks } from '@/hooks/brandHooks';
import type { CreateProductDTO, UpdateProductDTO } from '@/types/product';
import { toSlug } from '@/utils/convert';

export const useAddProductForm = () => {
    const initialFormData: CreateProductDTO = {
        name: 'Bình nóng lạnh Ariston 30l ngang SL3 30R',
        code: 'SL3 30R',
        slug: toSlug('Bình nóng lạnh Ariston 30l ngang SL3 30R'),
        categoryId: 5,
        brandId: 14,
        price: 34500000,
        discountPrice: 2925000,
        description: '',
        image: 'https://clickbuy.com.vn/uploads/pro/iphone-17-pro-3828-omfk-1024x1024-218702.jpg',
        isActive: true,
        createdAt: new Date().toISOString(),
    };

    const [formData, setFormData] = useState<CreateProductDTO>(initialFormData);
    const [preview, setPreview] = useState<string | null>(null);
    const { useCreate } = useProductHooks();
    const { useGetList: useCategoryList } = useCategoryHooks();
    const { useGetList: useBrandList } = useBrandHooks();

    const { data: categories } = useCategoryList(1, '', 30);
    const { data: brands } = useBrandList(1, '', 30);

    const createMutation = useCreate();


    // 👉 Cho TextField, TextArea
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
            slug: toSlug(prev.name ?? '')
        }));
    };

    // 👉 Cho Select (MUI yêu cầu kiểu riêng)
    const handleSelectChange = (e: SelectChangeEvent<number | string>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value === '' ? undefined : value,
        }));
    };

    // 🟣 Xử lý upload file
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            // reader.result là dạng base64 (Data URL)
            const base64String = reader.result as string;

            setFormData((prev) => ({
                ...prev,
                image: base64String, // Lưu vào formData
            }));
            setPreview(base64String);
        };

        reader.readAsDataURL(file); // Đọc file thành base64
    };

    // 🔵 Xử lý submit form
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.price || !formData.categoryId) {
            alert('Vui lòng điền đủ tên, giá và danh mục.');
            return;
        }
        // handleCreate()
        console.log('📦 Dữ liệu gửi đi:', formData);
    };


    const handleCreate = async () => {
        if (!formData.name || !formData.price || !formData.categoryId) {
            alert('Vui lòng điền đủ tên, giá và danh mục.');
            return;
        }
        const response = await createMutation.mutateAsync(formData);
        if (response.error) {
            alert(`Lỗi: ${response.error}`);
        } else {
            alert('Tạo thành công!');
        }
    };

    return {
        formData,
        setFormData,
        handleFileChange,
        handleSubmit,
        handleInputChange,
        handleSelectChange,
        handleCreate,
        brands,
        categories,
        preview
    };
};
