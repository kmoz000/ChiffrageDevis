import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle } from "../dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { LuFileEdit } from "react-icons/lu";

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

type EditArticleDialogProps = {
    article: Article;
    onSave: (updatedArticle: Article) => void;
};

const EditArticleDialog: React.FC<EditArticleDialogProps> = ({ article, onSave }) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ ...article });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        onSave(formData);
        setOpen(false);
        toast.success("Article updated successfully!");
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="kmoz-w-full kmoz-flex !kmoz-justify-start kmoz-items-center kmoz-pl-2 kmoz-cursor-pointer">
                    <LuFileEdit className="kmoz-h-4 kmoz-w-4" />
                    <span className="kmoz-ml-2">Edit</span>
                </Button>
            </DialogTrigger>
            <DialogPortal>
                <DialogOverlay className="kmoz-relative kmoz-inset-0 kmoz-bg-black kmoz-bg-opacity-50" />
                <DialogContent className="kmoz-top-1/2 kmoz-left-1/2 kmoz-h-[90%] kmoz-p-6 kmoz-fixed kmoz-bg-white kmoz-shadow-lg kmoz-rounded-lg kmoz-overflow-scroll no-scrollbar">
                    <DialogTitle>Edit Article</DialogTitle>
                    <DialogDescription>Make changes to the article below.</DialogDescription>
                    <form className="kmoz-space-y-4">
                        {Object.keys(article).map((key) => (
                            <div key={key}>
                                <label className="kmoz-block kmoz-font-medium kmoz-text-gray-700 kmoz-text-sm">{key}</label>
                                <Input
                                    type="text"
                                    name={key}
                                    value={(formData as any)[key]}
                                    onChange={handleChange}
                                    className="kmoz-block kmoz-w-full kmoz-mt-1"
                                />
                            </div>
                        ))}
                    </form>
                    <div className="kmoz-flex kmoz-justify-end kmoz-space-x-2 kmoz-mt-4">
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSave}>Save</Button>
                    </div>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
};

export default EditArticleDialog;
