import { useEffect, useState } from 'react';
import type { SelectChangeEvent } from '@mui/material';
import { useAttributeDefinitionHooks } from '@/hooks/attributeDefinitionHooks';
import { useAttributeOptionHooks } from '@/hooks/attributeOptionHooks';
import type { CreateAttributeOptionDTO, } from '@/types/attributeOption';

const initialFormData: CreateAttributeOptionDTO = {
    attributeDefinitionId: 3,
    valueKey: '',
    label: '',
    displayOrder: 1,
};

export const useAttributeOptionForm = () => {

    const [formData, setFormData] = useState<CreateAttributeOptionDTO>(initialFormData);
    const { useGetList: useAttributeDefinitionList, } = useAttributeDefinitionHooks();
    const { useGetList: useAttributeOptionList, } = useAttributeOptionHooks();
    const { getFilteredAttributeOption, filteredAttributeOptions, useCreate } = useAttributeOptionHooks();

    const { data: attributeDefinitions } = useAttributeDefinitionList(1, '', 20);
    const { data: attributeOptions } = useAttributeOptionList(1, '', 50);

    const createMutation = useCreate();

    useEffect(() => {
        getFilteredAttributeOption({ page: 1, size: 50, attributeDefinitionId: formData.attributeDefinitionId })
    }, [formData])


    // 👉 Cho TextField, TextArea
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
            displayOrder: (attributeOptions?.data?.items.length || 0) + 1
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

    const handleCreate = async () => {
        if (!formData.attributeDefinitionId || !formData.displayOrder || !formData.label || !formData.valueKey) {
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
        attributeDefinitions,
        setFormData,
        handleInputChange,
        handleSelectChange,
        handleCreate,
        attributeOptions,
        filteredAttributeOptions
    };
};
