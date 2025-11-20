import { useEffect, useState } from 'react';
import type { SelectChangeEvent } from '@mui/material';
import { useAttributeDefinitionHooks } from '@/hooks/attributeDefinitionHooks';
import { useProductAttributeOptionHooks } from '@/hooks/productAttributeOptionHooks';
import { useAttributeOptionHooks } from '@/hooks/attributeOptionHooks';
import { useProductHooks } from '@/hooks/productHooks';
import { useBrandCategoryHooks } from '@/hooks/brandCtegoryHooks';

export const useProductAttributeOptionForm = () => {
    const [attributeDefinitionId, setAttributeDefinitionId] = useState<number>(1);
    const [attributeOptionId, setAttributeOptionId] = useState<number>();
    const [categoryId, setCategoryId] = useState<number>();
    const [brandId, setBrandId] = useState<number>();
    const [listProductId, setListProductId] = useState<number[]>([]);
    const { useGetList: useAttributeDefinitionList, } = useAttributeDefinitionHooks();
    const { getFilteredBrandCategories, filteredBrandCategories, } = useBrandCategoryHooks();
    const { getFilteredProductAttributeOptions, filteredProductAttributeOptions, importProductAttributeOptions } = useProductAttributeOptionHooks();
    const { getFilteredAttributeOption, filteredAttributeOptions } = useAttributeOptionHooks();
    const { getFilteredProducts, filteredProducts } = useProductHooks();
    const { data: attributeDefinitions } = useAttributeDefinitionList(1, '', 20);

    useEffect(() => {
        if (brandId && categoryId) {
            getFilteredProductAttributeOptions({ page: 1, size: 50, categoryId, brandId, attributeDefinitionId })
        }
    }, [brandId, categoryId, attributeOptionId, attributeDefinitionId])

    useEffect(() => {
        getFilteredAttributeOption({ page: 1, size: 50, attributeDefinitionId: attributeDefinitionId })
    }, [attributeDefinitionId])

    useEffect(() => {
        if (categoryId) {
            getFilteredBrandCategories({ page: 1, size: 50, categoryId })
        }
    }, [categoryId])

    useEffect(() => {
        if (brandId && categoryId) {
            getFilteredProducts({ page: 1, size: 50, categoryId, brandId })
        }
    }, [brandId, categoryId])

    // 👉 Cho Select (MUI yêu cầu kiểu riêng)
    const handleSelectChange = (e: SelectChangeEvent<number | string>) => {
        const { value } = e.target;
        setAttributeOptionId(Number(value))
    };

    const handleBrandChange = (e: SelectChangeEvent<number | string>) => {
        const { value } = e.target;
        setBrandId(Number(value))
    };

    // 👉 Cho Select (MUI yêu cầu kiểu riêng)
    const handleSelectAttributeDefinition = (e: SelectChangeEvent<number | string>) => {
        const { value } = e.target;
        setAttributeDefinitionId(Number(value))
        attributeDefinitions?.data?.items.forEach(element => {
            if (element.id == Number(value)) {
                setCategoryId(element.categoryId)
            }
        });
    };

    const handleCreate = async () => {
        if (!attributeOptionId || !listProductId.length) {
            alert('Vui lòng điền đủ tên, giá và danh mục.');
            return;
        }
        const response = await importProductAttributeOptions({ productIds: listProductId, replaceSameAttribute: true, optionId: attributeOptionId });
        if (response.error) {
            alert(`Lỗi: ${response.error}`);
        } else {
            alert('Tạo thành công!');
            setListProductId([])
        }
    };

    const handleSelectProduct = (checked: boolean, productId: number) => {
        if (checked) {
            setListProductId(prev => (prev.includes(productId) ? prev : [...prev, productId]));
        } else {
            setListProductId(prev => prev.filter(x => x !== productId));
        }
    }

    const handleReset = () => {
        setListProductId([])
    }

    const handleAttribute = (productId: number) => {
        const attribute = filteredProductAttributeOptions?.items.find(item => item.productId == productId)
        if (attribute) {
            return attribute.optionLabel
        } else {
            return ''
        }
    }

    return {
        attributeDefinitions,
        handleSelectChange,
        handleCreate,
        filteredAttributeOptions,
        attributeDefinitionId,
        handleSelectAttributeDefinition,
        filteredProducts,
        handleSelectProduct,
        listProductId,
        handleReset,
        attributeOptionId,
        filteredBrandCategories,
        handleBrandChange,
        brandId,
        handleAttribute
    };
};
