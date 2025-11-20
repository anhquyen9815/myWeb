import React, { useEffect, useState } from 'react';
import { useProductHooks } from '@/hooks/productHooks';
import type { CreateProductDTO, DataExcel, UpdateGalleryDTO } from '@/types/product';
import Papa from 'papaparse';
import * as XLSX from "xlsx";
import { toSlug } from '@/utils/convert';



interface DataExcel2 {
    nameSheet: string,
    data: UpdateGalleryDTO[],
    id: number
}

export const useProductUpdateGallery = () => {
    const [indexSheetExcel, setIndexSheetExcel] = useState(0);
    const [imageList, setImageList] = useState<UpdateGalleryDTO[]>([]);
    const [dataExcel, setDataExcel] = useState<DataExcel2[]>([]);
    const { updateGalleryProducts, loadingBulk } = useProductHooks();

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
            let listDataTemp: DataExcel2[] = []
            sheetNames.forEach((sheetName, index) => {
                // listSheetName = [...listSheetName, sheetName]
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json<any>(worksheet, { defval: "" });
                const products: UpdateGalleryDTO[] = jsonData
                    .filter((r) => r.Code && r.Gallery)
                    .map((r) => ({
                        idProduct: Number(r.Id) || 0,
                        codeProduct: r.Code?.toString().trim(),
                        gallery: r.Gallery?.toString().trim(),
                        listGallery: r.Gallery?.toString().split(';'),
                    }));
                listDataTemp = [...listDataTemp, {
                    id: index, nameSheet: sheetName, data: products
                }]
            });
            setDataExcel(listDataTemp)
            setImageList(listDataTemp[0].data)
        };

        reader.readAsArrayBuffer(file);
    };

    const handleRemoteImage = (image: string, indexItem: number,) => {
        var tempGallery = imageList[indexItem].gallery.replace(`${image};`, '')
        imageList[indexItem].gallery = tempGallery
        imageList[indexItem].listGallery = tempGallery.split(';')
        console.log('Quyen image', image)
        console.log('Quyen imageList[indexItem].gallery', imageList[indexItem])
        setImageList([...imageList])
    }

    // ---------------------------
    // 🧩 Thêm nhiều sản phẩm
    // ---------------------------
    const handleImport = async () => {
        var temp: UpdateGalleryDTO[] = imageList
        temp.forEach((item) => {
            item.listGallery = item.listGallery?.filter(ele => !ele.includes('Banner'))
            item.gallery = item.listGallery?.join(';') || ''
            item.image = item.listGallery?.[0]
        })
        console.log('Quyen temp', temp)
        try {
            const res = await updateGalleryProducts(temp);
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
            setImageList(dataExcel[indexSheetExcel].data)
        }
    }, [indexSheetExcel])

    return {
        imageList,
        loadingBulk,
        handleImport,
        handleFileUpload,
        dataExcel,
        indexSheetExcel,
        setIndexSheetExcel,
        handleRemoteImage
    };

}
