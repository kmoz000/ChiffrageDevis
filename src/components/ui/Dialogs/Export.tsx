import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "../dialog";
import { databaseService } from "@/lib/store";
import logo from "@/assets/logo.png";
import { FaFilePdf } from "react-icons/fa";
import jsPDF from "jspdf";

type Devis = {
    id: number;
    project_index_id: number;
    quantity: number;
    total_ht: number;
};

type ExportDevisDialogProps = {
    selectedDevis: Devis[];
};

const ExportDevisDialog: React.FC<ExportDevisDialogProps> = ({ selectedDevis }) => {
    const [open, setOpen] = useState(false);
    const [receiverDetails, setReceiverDetails] = useState({
        companyName: "",
        address: "",
        phone: "",
        email: "",
    });

    const handleExport = () => {
        const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

        const pdf = new jsPDF();
        pdf.setProperties({
            title: "Commercial Offer",
            subject: "Devis List",
            author: "Your Company Name",
            keywords: "devis, commercial, offer",
            creator: "Your Company Name",
        });

        // Add Devis title
        pdf.setFont("helvetica");
        pdf.setFontSize(20);
        pdf.text("Commercial Offer", 105, 20, { align: "center" });

        // Add receiver details
        pdf.setFontSize(12);
        pdf.text(`Company Name: ${receiverDetails.companyName}`, 20, 40);
        pdf.text(`Address: ${receiverDetails.address}`, 20, 50);
        pdf.text(`Phone: ${receiverDetails.phone}`, 20, 60);
        pdf.text(`Email: ${receiverDetails.email}`, 20, 70);

        // Add Devis list
        pdf.setFontSize(14);
        pdf.setTextColor(0, 0, 255);
        pdf.text("Devis List", 105, 90, { align: "center" });
        pdf.setLineWidth(0.5);
        pdf.line(20, 95, 190, 95); // Horizontal line under the title

        pdf.setLineWidth(0.5);
        pdf.line(20, 95, 190, 95); // Horizontal line under the title

        const devisData = selectedDevis.map(devis => ({
            "ID": devis.id.toString(),
            "Project Index ID": devis.project_index_id.toString(),
            "Quantity": devis.quantity.toString(),
            "Total HT": devis.total_ht.toFixed(2)
        }));

        pdf.table(20, 100, devisData, ["ID", "Project Index ID", "Quantity", "Total HT"], { autoSize: true });


        // Calculate and add totals
        const totalHT = selectedDevis.reduce((acc, devis) => acc + devis.total_ht, 0);
        const totalTTC = totalHT * 1.2;
        pdf.setFontSize(14);
        pdf.setTextColor(255, 0, 0);
        pdf.text(`Total HT: ${totalHT.toFixed(2)}`, -120, -20, { align: "right" });
        pdf.setTextColor(0, 128, 0);
        pdf.text(`Total TTC 20%: ${totalTTC.toFixed(2)}`, 10, -20, { align: "right" });

        // Save the PDF
        pdf.save(`commercial_offer_${currentDate}.pdf`);

        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default" className="kmoz-mx-2 kmoz-my-1">
                    <FaFilePdf size={17} />
                    <span className="kmoz-ml-2">Export</span>
                </Button>
            </DialogTrigger>
            <DialogPortal>
                <DialogOverlay className="kmoz-fixed kmoz-inset-0 kmoz-bg-black/50" />
                <DialogContent className="kmoz-top-1/2 kmoz-left-1/2 kmoz-p-6 kmoz-fixed kmoz-bg-white kmoz-shadow-lg kmoz-rounded-lg kmoz-transform kmoz--translate-x-1/2 kmoz--translate-y-1/2">
                    <DialogTitle>Export Devis</DialogTitle>
                    <DialogDescription>Fill in the details below to export the selected devis.</DialogDescription>
                    <div className="kmoz-flex kmoz-space-x-4">
                        <div className="kmoz-flex-none">
                            <img src={logo} alt="Company Logo" className="kmoz-h-auto kmoz-object-contain kmoz-w-20" />
                        </div>
                        <div className="kmoz-flex-grow">
                            <form className="kmoz-space-y-4">
                                <div>
                                    <label className="kmoz-block kmoz-font-medium kmoz-text-gray-700 kmoz-text-sm">Company Name</label>
                                    <Input
                                        type="text"
                                        value={receiverDetails.companyName}
                                        onChange={(e) => setReceiverDetails({ ...receiverDetails, companyName: e.target.value })}
                                        className="kmoz-block kmoz-w-full kmoz-mt-1"
                                    />
                                </div>
                                <div>
                                    <label className="kmoz-block kmoz-font-medium kmoz-text-gray-700 kmoz-text-sm">Address</label>
                                    <Input
                                        type="text"
                                        value={receiverDetails.address}
                                        onChange={(e) => setReceiverDetails({ ...receiverDetails, address: e.target.value })}
                                        className="kmoz-block kmoz-w-full kmoz-mt-1"
                                    />
                                </div>
                                <div>
                                    <label className="kmoz-block kmoz-font-medium kmoz-text-gray-700 kmoz-text-sm">Phone</label>
                                    <Input
                                        type="text"
                                        value={receiverDetails.phone}
                                        onChange={(e) => setReceiverDetails({ ...receiverDetails, phone: e.target.value })}
                                        className="kmoz-block kmoz-w-full kmoz-mt-1"
                                    />
                                </div>
                                <div>
                                    <label className="kmoz-block kmoz-font-medium kmoz-text-gray-700 kmoz-text-sm">Email</label>
                                    <Input
                                        type="text"
                                        value={receiverDetails.email}
                                        onChange={(e) => setReceiverDetails({ ...receiverDetails, email: e.target.value })}
                                        className="kmoz-block kmoz-w-full kmoz-mt-1"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="kmoz-flex kmoz-justify-end kmoz-space-x-2 kmoz-mt-4">
                        <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button variant="default" onClick={handleExport}>Export</Button>
                    </div>
                    <div className="kmoz-border-gray-200 kmoz-mt-4 kmoz-border-t">
                        <p className="kmoz-mt-4 kmoz-font-medium kmoz-text-gray-700 kmoz-text-sm">Total HT: {selectedDevis.reduce((acc, devis) => acc + devis.total_ht, 0)}</p>
                        <p className="kmoz-font-medium kmoz-text-gray-700 kmoz-text-sm">Total TTC 20%: {selectedDevis.reduce((acc, devis) => acc + devis.total_ht * 1.2, 0)}</p>
                    </div>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
};

export default ExportDevisDialog;
