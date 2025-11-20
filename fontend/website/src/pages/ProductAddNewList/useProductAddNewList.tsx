import React, { useEffect, useState } from 'react';
import { useProductHooks } from '@/hooks/productHooks';
import { useBrandHooks } from '@/hooks/brandHooks';
import { useCategoryHooks } from '@/hooks/categoryHooks';
import type { CreateProductDTO, DataExcel } from '@/types/product';
import Papa from 'papaparse';
import * as XLSX from "xlsx";
import { toSlug } from '@/utils/convert';

export interface ConvertAddress {
    wardOldId: number;
    wardNewId: number;
    wardOldName: string;
    wardNewName: string;
    villageOldId: number;
    villageNewId: number;
    villageOldName: string;
    villageNewName: string;
}

export const useProductAddNewList = () => {
    const [page, setPage] = useState(1);
    const [indexSheetExcel, setIndexSheetExcel] = useState(0);
    const [searchKey, setSearchKey] = useState<string>('');
    const [productList, setProductList] = useState<CreateProductDTO[]>([]);
    const [dataExcel, setDataExcel] = useState<DataExcel[]>([]);
    const { useGetList: useGetListBrand } = useBrandHooks();
    const { useGetList: useGetListCategory } = useCategoryHooks();
    const { importProducts, loadingBulk } = useProductHooks();

    // ---------------- List ----------------
    const { data: listBrand, } = useGetListBrand(page, '', 50);
    const { data: listCategory, } = useGetListCategory(page, '', 50);

    const fetchSheet = async () => {
        const ID_SHEET = '2PACX-1vTOqNjFeuY8TW3gfcwb011jNwi-YXEFYdsvbe7OYZOT1eMKtyC4ExGgFHQAPLBzC8viCGaaeLAjIJeJ'
        const ID_SHEET2 = '2PACX-1vTOqNjFeuY8TW3gfcwb011jNwi-YXEFYdsvbe7OYZOT1eMKtyC4ExGgFHQAPLBzC8viCGaaeLAjIJeJ'

        const url = `https://docs.google.com/spreadsheets/d/e/${ID_SHEET2}/pub?output=csv`;
        const res = await fetch(url);
        const text = await res.text();
        const parsed = Papa.parse(text, { header: true });
        const rawData = parsed.data as any[];
        const products: CreateProductDTO[] = rawData
            .filter((r) => r.Code && r.Name)
            .map((r) => ({
                code: r.Code?.trim(),
                name: r.Name?.trim(),
                price: Number(r.Price) || 0,
                discountPrice: Number(r.DiscountPrice) || 0,
                brandId: Number(r.BrandId) || 0,
                categoryId: Number(r.CategoryId) || 0,
                description: r.Description?.trim() || '',
                image: r.Image || '',
            }));
        setProductList(products)
        // return parsed.data;
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const data = new Uint8Array(event.target?.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: "array" });

            // 👉 Lấy tất cả tên sheet
            const sheetNames = workbook.SheetNames;

            // 👉 Lặp qua tất cả sheet để lấy dữ liệu
            let listDataTemp: DataExcel[] = []
            sheetNames.forEach((sheetName, index) => {
                // listSheetName = [...listSheetName, sheetName]
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json<any>(worksheet, { defval: "" });
                const products: CreateProductDTO[] = jsonData
                    .filter((r) => r.Code && r.Name)
                    .map((r) => ({
                        code: r.Code?.toString().trim(),
                        name: r.Name?.toString().trim(),
                        slug: toSlug(r.Name?.toString().trim()),
                        price: Number(r.Price) || 0,
                        discountPrice: Number(r.DiscountPrice) || 0,
                        brandId: Number(r.BrandId) || 0,
                        categoryId: Number(r.CategoryId) || 0,
                        description: r.Description?.toString().trim() || "",
                        image: r.Image?.toString() || "",
                        gallery:  r.Gallery?.toString() || "",
                    }));
                listDataTemp = [...listDataTemp, {
                    id: index, nameSheet: sheetName, data: products
                }]
            });
            setDataExcel(listDataTemp)
            setProductList(listDataTemp[0].data)
        };

        reader.readAsArrayBuffer(file);
    };

    function parseIdAndName(input: string): { id: number; name: string } {
        // Xóa khoảng trắng thừa ở đầu/cuối và giữa
        const clean = input.trim().replace(/\s+/g, " ");
        // Tách phần đầu là số ID, phần sau là tên
        const match = clean.match(/^(\d+)\.?\s*(.*)$/);
        if (!match) {
            return { id: 0, name: clean };
        }

        const id = parseInt(match[1], 10);
        const name = match[2].trim();
        return { id, name };
    }


    const handleFileUpload2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const data = new Uint8Array(event.target?.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: "array" });

            // 👉 Lấy tất cả tên sheet
            const sheetNames = workbook.SheetNames;

            // 👉 Lặp qua tất cả sheet để lấy dữ liệu
            let listDataTemp: DataExcel[] = []
            let nameSheet = sheetNames[0]
            const worksheet = workbook.Sheets[nameSheet];
            const jsonData = XLSX.utils.sheet_to_json<any>(worksheet, { defval: "" });
            const address: ConvertAddress[] = jsonData
                .map((item) => ({
                    wardOldId: parseIdAndName(item.xaold).id,
                    wardNewId: parseIdAndName(item.xanew).id,
                    wardOldName: parseIdAndName(item.xaold).name,
                    wardNewName: parseIdAndName(item.xanew).name,
                    villageOldId: parseIdAndName(item.thonold).id,
                    villageNewId: parseIdAndName(item.thonnew).id,
                    villageOldName: parseIdAndName(item.thonold).name,
                    villageNewName: parseIdAndName(item.thonnew).name,
                }))

        };

        reader.readAsArrayBuffer(file);
    };

    const handleClear = () => {
        setSearchKey('');
        setPage(1);
    };


    // ---------------------------
    // 🧩 Thêm nhiều sản phẩm
    // ---------------------------
    const handleImport = async () => {
        console.log('Quyen productList', productList)
        try {
            const res = await importProducts(productList);
            alert(`Đã thêm ${res.data?.inserted} sản phẩm mới`);
        } catch (err: any) {
            alert('Quyen Import thất bại',);
        }
    };
    useEffect(() => {
        // fetchSheet()
    }, [])

    useEffect(() => {
        if (dataExcel && dataExcel.length) {
            setProductList(dataExcel[indexSheetExcel].data)
        }
    }, [indexSheetExcel])

    return {
        listBrand,
        listCategory,
        searchKey,
        setSearchKey,
        productList,
        setProductList,
        handleClear,
        loadingBulk,
        handleImport,
        handleFileUpload,
        dataExcel,
        indexSheetExcel,
        setIndexSheetExcel
    };

}
