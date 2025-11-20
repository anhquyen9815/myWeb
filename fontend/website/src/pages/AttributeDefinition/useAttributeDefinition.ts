import { useState } from 'react';
import type { SelectChangeEvent } from '@mui/material';
import { useAttributeDefinitionHooks } from '@/hooks/attributeDefinitionHooks';
import { useCategoryHooks } from '@/hooks/categoryHooks';
import { useBrandHooks } from '@/hooks/brandHooks';
import type { CreateAttributeDefinitionDTO, } from '@/types/attributeDefinition';

const initialFormData: CreateAttributeDefinitionDTO = {
    name: '',
    displayName: '',
    categoryId: 5,
    dataType: 'Option',
    displayOrder: 1,
};

export const useAttributeDefinitionForm = () => {

    const [formData, setFormData] = useState<CreateAttributeDefinitionDTO>(initialFormData);
    const [preview, setPreview] = useState<string | null>(null);
    const { useCreate, useGetList: useAttributeDefinitionList,  } = useAttributeDefinitionHooks();
    const { useGetList: useCategoryList,  } = useCategoryHooks();
    const { useGetList: useBrandList } = useBrandHooks();
    const [refresh, setRefresh] = useState<number>(1)

    const { data: categories } = useCategoryList(1, '', 30);
    const { data: brands } = useBrandList(1, '', 30);
    const { data: attributeDefinitions } = useAttributeDefinitionList(refresh, '', 20);

    const createMutation = useCreate();


    // 👉 Cho TextField, TextArea
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
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
        if (!formData.name || !formData.displayName || !formData.categoryId || !formData.dataType) {
            alert('Vui lòng điền đủ tên, giá và danh mục.');
            return;
        }
        // handleCreate()
        console.log('📦 Dữ liệu gửi đi:', formData);
    };


    const handleCreate = async () => {
        const response = await createMutation.mutateAsync(formData);
        if (response.error) {
            alert(`Lỗi: ${response.error}`);
        } else {
            alert('Tạo thành công!');
            setRefresh(1)
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
        preview,
        attributeDefinitions
    };
};
