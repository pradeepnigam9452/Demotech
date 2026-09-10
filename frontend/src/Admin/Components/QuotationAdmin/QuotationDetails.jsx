import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import logo from '../../../assets/demologo.png';
import logo2 from '../../../assets/waterMark.jpg';
import qrcode from '../../../assets/QrCode.jpg';
import { Phone, Mail, MapPin } from 'lucide-react';

const QuotationDetail = ({ quotationId }) => {
    const [quotation, setQuotation] = useState(null);
    const [loading, setLoading] = useState(true);
    const pdfRef = useRef();
    const hiddenRef = useRef();

    useEffect(() => {
        const fetchQuotation = async () => {
            if (!quotationId) return;
            try {
                const response = await axios.get(`/api/quotations/getQuotationById/${quotationId}`);
                setQuotation(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching quotation:", error);
                setLoading(false);
            }
        };
        fetchQuotation();
    }, [quotationId]);

    if (loading) return <p className="text-center mt-8">Loading...</p>;
    if (!quotation) return <p className="text-center mt-8 text-red-500">Quotation not found.</p>;

    const { customerName, address, contactNo, serviceName, quotationNo, companyName, email, contact, items, totalAmount, terms } = quotation;

    const handleDownloadPDF = async () => {
        if (!hiddenRef.current) return;
        const input = hiddenRef.current;

        try {
            input.style.display = "block";
            input.style.opacity = "1";

            const canvas = await html2canvas(input, { scale: 2, useCORS: true });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = pageWidth;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save(`Quotation_${quotationNo}.pdf`);
        } catch (err) {
            console.error("Error generating PDF:", err);
        } finally {
            input.style.display = "none";
            input.style.opacity = "0";
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 mt-8 font-sans text-sm">
            <div ref={pdfRef} className="relative bg-white p-6 rounded-md shadow-lg">
                <div className="mb-6 flex justify-center">
                    <img src={logo} alt="Company Logo" className="h-16 object-contain" />
                </div>

                <h2 className="font-bold text-2xl mb-6 text-center" style={{ color: "#2563EB" }}>Quotation Detail</h2>

                <div className="flex justify-between gap-8 mb-6 text-sm flex-col sm:flex-row">
                    <div>
                        <p className="mb-2"><span className="font-semibold" style={{ color: "#2c3e50" }}>Customer Name:</span> {customerName}</p>
                        <p className="mb-2"><span className="font-semibold" style={{ color: "#2c3e50" }}>Address:</span> {address}</p>
                        <p className="mb-2"><span className="font-semibold" style={{ color: "#2c3e50" }}>Contact No:</span> {contactNo}</p>
                        <p className="mb-2"><span className="font-semibold" style={{ color: "#2c3e50" }}>Service:</span> {serviceName}</p>
                    </div>
                    <div>
                        <p className="mb-2"><span className="font-semibold" style={{ color: "#2c3e50" }}>Quotation No:</span> {quotationNo}</p>
                        <p className="mb-2"><span className="font-semibold" style={{ color: "#2c3e50" }}>Company Name:</span> {companyName}</p>
                        <p className="mb-2"><span className="font-semibold" style={{ color: "#2c3e50" }}>Email:</span> {email}</p>
                        <p className="mb-2"><span className="font-semibold" style={{ color: "#2c3e50" }}>Contact:</span> {contact}</p>
                    </div>
                </div>

                <div className="overflow-x-auto mb-6">
                    <table className="w-full border-separate border-spacing-y-[5px] mb-6 text-[13px]" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                        <thead style={{ backgroundColor: "#8bb9f2", color: "#ffffff" }}>
                            <tr>
                                <th className="pl-4 py-2 text-left">Details</th>
                                <th className="py-2 text-center">Quantity</th>
                                <th className="py-2 text-center">Unit</th>
                                <th className="py-2 text-center">Price(In Rupees)</th>
                                <th className="py-2 text-center">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#ffffff" : "#F3F4F6" }}>
                                    <td className="px-4 py-2">{item.details}</td>
                                    <td className="px-4 py-2 text-center">{item.quantity}</td>
                                    <td className="px-4 py-2 text-center">{item.unit}</td>
                                    <td className="px-4 py-2 text-center">₹{item.price}</td>
                                    <td className="px-4 py-2 text-center">₹{item.quantity * item.price}</td>
                                </tr>
                            ))}
                            <tr style={{ backgroundColor: "#ffffff", fontWeight: "bold" }}>
                                <td colSpan="4" className="px-4 py-2 text-right">Total Amount</td>
                                <td className="px-4 py-2 text-center">₹{totalAmount}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="rounded p-4 mb-6 text-sm" style={{ backgroundColor: "#F9FAFB" }}>
                    <h3 className="font-semibold mb-2" style={{ color: "#2563EB" }}>Terms & Conditions</h3>
                    <ul className="list-disc list-inside space-y-1">
                        {terms.split('\n').map((line, index) => (
                            <li key={index}>{line}</li>
                        ))}
                    </ul>
                </div>

                <button
                    onClick={handleDownloadPDF}
                    className="w-full text-white px-4 py-3 rounded hover:bg-blue-600"
                    style={{ backgroundColor: "#477ae8ff" }}
                >
                    Download PDF
                </button>
            </div>

            {/* ✅ Hidden clone for PDF with watermark styling + QR code */}
            <div
                ref={hiddenRef}
                style={{ display: "none", opacity: 0 }}
                className="absolute -top-[10000px] -left-[10000px] w-[210mm] p-[20px] bg-white text-black font-sans overflow-hidden"
            >
                <div className="absolute top-[22%] left-[22%] opacity-6 z-0 pointer-events-none">
                    <img src={logo2} alt="Watermark Logo" className="w-[450px] h-[600px]" />
                </div>

                <div className="relative z-1">
                    <div className="flex justify-between items-center mb-[25px]">
                        <img src={logo} alt="Company Logo" className="mt-[15px] h-[60px] object-contain" />
                        <div className="text-right text-[14px] mt-4 ml-2 leading-relaxed">
                            <p className="flex justify-end items-end gap-1.5 leading-normal">
                                <span>+91 {contact}</span>
                                <Phone size={14} color="black" className="align-text-bottom" />
                            </p>
                            <p className="flex justify-end items-end gap-1.5 leading-normal">
                                <span>{email}</span>
                                <Mail size={16} color="black" className="align-text-bottom relative top-[2px]" />
                            </p>
                            <p className="flex justify-end items-end gap-1.5 leading-normal">
                                <span className="leading-tight">
                                    Himanshu apartment, Indrapuri A sector,<br />
                                    Bhopal, Madhya Pradesh 462041
                                </span>
                                <MapPin size={14} color="black" className="align-text-bottom" />
                            </p>
                        </div>
                    </div>
                </div>

                <h2 className="text-center text-[22px] mb-[20px] border-b border-[#2c3e50] pb-[14px]" style={{ color: "#2c3e50" }}>
                    Quotation
                </h2>

                <div className="flex justify-between mb-[20px] text-[14px] leading-[2]">
                    <div>
                        <p><strong style={{ color: "#2c3e50" }}>Customer Name:</strong> {customerName}</p>
                        <p><strong style={{ color: "#2c3e50" }}>Address:</strong> {address}</p>
                        <p><strong style={{ color: "#2c3e50" }}>Contact No:</strong> {contactNo}</p>
                        <p><strong style={{ color: "#2c3e50" }}>Service:</strong> {serviceName}</p>
                    </div>
                    <div>
                        <p><strong style={{ color: "#2c3e50" }}>Quotation No:</strong> {quotationNo}</p>
                        <p><strong style={{ color: "#2c3e50" }}>Date:</strong> {new Date().toLocaleDateString()}</p>
                    </div>
                </div>

                <table className="w-full border-separate border-spacing-y-[5px] mb-[20px] text-[13px] shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
                    <thead className="pb-[10px]">
                        <tr className="bg-[#8bb9f2ff] text-white">
                            <th className="pb-[12px] pl-[10px] text-left">Details</th>
                            <th className="pb-[12px] text-center">Quantity</th>
                            <th className="pb-[12px] text-center">Unit</th>
                            <th className="pb-[12px] text-center">Price(In Rupees)</th>
                            <th className="pb-[12px] text-center">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#ffffff" : "#F3F4F6" }}>
                                <td className="px-4 py-2">{item.details}</td>
                                <td className="px-4 py-2 text-center">{item.quantity}</td>
                                <td className="px-4 py-2 text-center">{item.unit}</td>
                                <td className="px-4 py-2 text-center">₹{item.price}</td>
                                <td className="px-4 py-2 text-center">₹{item.quantity * item.price}</td>
                            </tr>
                        ))}
                        <tr style={{ backgroundColor: "#ffffff", fontWeight: "bold" }}>
                            <td colSpan="4" className="px-4 py-2 text-right">Total Amount</td>
                            <td className="px-4 py-2 text-center">₹{totalAmount}</td>
                        </tr>
                    </tbody>
                </table>

                <div className="flex justify-between items-start mt-6">
                    <div className="text-[14px] leading-[1.8] text-[#01070dff] w-[75%]">
                        <strong className="pl-[13px]">Terms & Conditions</strong>
                        <ul className="mt-2 pl-5">
                            {terms.split('\n').map((line, index) => (
                                <li key={index}>{line}</li>
                            ))}
                        </ul>
                    </div>
                    {/* Right side - QR Code */}
                    <div className="ml-4 flex-shrink-0 text-center mt-8">
                        <img
                            src={qrcode}
                            alt="QR Code"
                            className="w-32 h-32 object-contain mx-auto"
                        />
                        <p className="-mt-1 text-[12px] text-black-600">
                            Scan & Pay
                        </p>

                    </div>

                </div>

                {/* <div className="text-center mt-[30px] text-[12px]" style={{ color: "#6B7280" }}>
                    <p>Thank you for choosing {companyName}.</p>
                    <p>Please contact us if you have any questions regarding this quotation.</p>
                </div> */}
            </div>
        </div>
    );
};

export default QuotationDetail;
