import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "../dialog";
import { minmaxrand } from "@/lib/utils";

type Article = {
    id: number;
    designation: string;
    unit: string;
    prix_achat_transport: number;
    chutes: number;
    consommable: number;
    boulonnerie: number;
    total: number;
};

type AddArticleDialogProps = {
    onSave: (newArticle: Article) => void;
};

const AddArticleDialog: React.FC<AddArticleDialogProps> = ({ onSave }) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState<Article>({
        id: 0,
        designation: "",
        unit: "",
        prix_achat_transport: 0,
        chutes: 0,
        consommable: 0,
        boulonnerie: 0,
        total: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let flop = minmaxrand(0.01, 0.1)
        setFormData({
            ...formData, [name]: Number(value),
            chutes: formData.prix_achat_transport * flop,
            consommable: formData.prix_achat_transport * flop,
            total: formData.prix_achat_transport + formData.chutes + formData.consommable + formData.boulonnerie
        });
    };

    const handleSave = () => {
        onSave(formData);
        setOpen(false);
        toast.success("Article added successfully!");
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default" className="kmoz-mx-2 kmoz-my-1">
                    Ajouter
                </Button>
            </DialogTrigger>
            <DialogPortal>
                <DialogOverlay className="kmoz-fixed kmoz-inset-0 kmoz-bg-black/5 kmoz-bg-opacity-50" />
                <DialogContent className="kmoz-h-[85%] kmoz-p-0 kmoz-bg-white kmoz-shadow-lg kmoz-rounded-lg kmoz-overflow-x-hidden no-scrollbar">
                    <DialogTitle>Add New Article</DialogTitle>
                    <DialogDescription>Enter details for the new article below.</DialogDescription>
                    <form className="kmoz-space-y-4">
                        <div>
                            <label className="kmoz-block kmoz-font-medium kmoz-text-gray-700 kmoz-text-sm">Designation</label>
                            <Input
                                type="text"
                                name="designation"
                                value={formData.designation}
                                required
                                onChange={handleChange}
                                className="kmoz-block kmoz-w-full kmoz-mt-1"
                            />
                        </div>
                        <div>
                            <label className="kmoz-block kmoz-font-medium kmoz-text-gray-700 kmoz-text-sm">Unit</label>
                            <Input
                                type="text"
                                name="unit"
                                value={formData.unit}
                                required
                                onChange={handleChange}
                                className="kmoz-block kmoz-w-full kmoz-mt-1"
                            />
                        </div>
                        <div>
                            <label className="kmoz-block kmoz-font-medium kmoz-text-gray-700 kmoz-text-sm">Prix Achat Transport</label>
                            <Input
                                type="number"
                                name="prix_achat_transport"
                                value={formData.prix_achat_transport}
                                required
                                onChange={handleChange}
                                className="kmoz-block kmoz-w-full kmoz-mt-1"
                            />
                        </div>
                        <div>
                            <label className="kmoz-block kmoz-font-medium kmoz-text-gray-700 kmoz-text-sm">Chutes</label>
                            <Input
                                type="number"
                                name="chutes"
                                disabled
                                value={formData.chutes}
                                onChange={handleChange}
                                className="kmoz-block kmoz-w-full kmoz-mt-1"
                            />
                        </div>
                        <div>
                            <label className="kmoz-block kmoz-font-medium kmoz-text-gray-700 kmoz-text-sm">Consommable</label>
                            <Input
                                type="number"
                                name="consommable"
                                disabled
                                value={formData.consommable}
                                onChange={handleChange}
                                className="kmoz-block kmoz-w-full kmoz-mt-1"
                            />
                        </div>
                        <div>
                            <label className="kmoz-block kmoz-font-medium kmoz-text-gray-700 kmoz-text-sm">Boulonnerie</label>
                            <Input
                                type="number"
                                name="boulonnerie"
                                required
                                value={formData.boulonnerie}
                                onChange={handleChange}
                                className="kmoz-block kmoz-w-full kmoz-mt-1"
                            />
                        </div>
                        <div>
                            <label className="kmoz-block kmoz-font-medium kmoz-text-gray-700 kmoz-text-sm">Total</label>
                            <Input
                                type="number"
                                disabled
                                name="total"
                                value={formData.total}
                                onChange={handleChange}
                                className="kmoz-block kmoz-w-full kmoz-mt-1"
                            />
                        </div>
                    </form>
                    <div className="kmoz-flex kmoz-justify-end kmoz-space-x-2 kmoz-mt-4">
                        <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button variant="default" onClick={handleSave}>Save</Button>
                    </div>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
};

export default AddArticleDialog;
