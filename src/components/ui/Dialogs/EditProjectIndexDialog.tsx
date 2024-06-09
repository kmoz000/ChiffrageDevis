import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "../dialog";
import { LuFileEdit } from "react-icons/lu";

type ProjectIndex = {
    id: number;
    designation: string;
    unite: string;
    qte: number;
    matiere: number;
    mo: number;
    ce: number;
    cout: number;
    frais_machine: number;
    peinture: number;
    transport: number;
    manutention_mo_mont: number;
    ce_mont: number;
    cout_mont: number;
    frais_dep_chant: number;
    prix_de_revient: number;
    pr_un: number;
    marge: number;
    pv_un: number;
    pv_un_prix_vente_dh_ht: number;
};

type EditProjectIndexDialogProps = {
    projectIndex: ProjectIndex;
    onSave: (updatedProjectIndex: ProjectIndex) => void;
};

const EditProjectIndexDialog: React.FC<EditProjectIndexDialogProps> = ({ projectIndex, onSave }) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ ...projectIndex });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        onSave(formData);
        setOpen(false);
        toast.success("Project Index updated successfully!");
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
                    <DialogTitle>Edit Project Index</DialogTitle>
                    <DialogDescription>Make changes to the project index below.</DialogDescription>
                    <form className="kmoz-space-y-4">
                        {Object.keys(projectIndex).map((key) => (
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

export default EditProjectIndexDialog;
