import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "../dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select";
import { LuFileEdit } from "react-icons/lu";
import { databaseService } from "@/lib/store";

type Devis = {
    id: number;
    project_index_id: number;
    quantity: number;
    total_ht: number;
};

type ProjectIndex = {
    id: number;
    designation: string;
};

type EditDevisDialogProps = {
    devis: Devis;
    // projectIndices: ProjectIndex[];
    onSave: (updatedDevis: Devis) => void;
};

const EditDevisDialog: React.FC<EditDevisDialogProps> = ({ devis, onSave }) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ ...devis });
    const [_projectIndices, setProjectIndices] = useState([{
        value: 0,
        label: "none",
    }])
    useEffect(() => {
        (async () => {
            const loaded_projectIndices = await databaseService.fetchAllProjectIndexes() || []
            const projectIndexOptions = (loaded_projectIndices || [{
                value: 0,
                label: "none",
            }]).map((pi) => ({
                value: pi.id,
                label: pi.designation,
            }));
            setProjectIndices(projectIndexOptions)
        })()
    }, [])
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSelectChange = (selectedOption: any) => {
        setFormData({ ...formData, project_index_id: selectedOption.value });
    };

    const handleSave = () => {
        onSave(formData);
        setOpen(false);
        toast.success("Devis updated successfully!");
    };


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="kmoz-w-full kmoz-flex !kmoz-justify-start kmoz-items-center kmoz-pl-2 kmoz-cursor-pointer">
                    <LuFileEdit size={17} />
                    <span className="kmoz-ml-2">Edit</span>
                </Button>
            </DialogTrigger>
            <DialogPortal>
                <DialogOverlay className="kmoz-fixed kmoz-inset-0 kmoz-bg-black/5 kmoz-bg-opacity-50" />
                <DialogContent className="kmoz-top-1/2 kmoz-left-1/2 kmoz-p-6 kmoz-fixed kmoz-bg-white kmoz-shadow-lg kmoz-rounded-lg">
                    <DialogTitle>Edit Devis</DialogTitle>
                    <DialogDescription>Make changes to the devis below.</DialogDescription>
                    <form className="kmoz-space-y-4">
                        <div>
                            <label className="kmoz-block kmoz-font-medium kmoz-text-gray-700 kmoz-text-sm">ID</label>
                            <Input
                                type="text"
                                name="id"
                                value={formData.id}
                                onChange={handleChange}
                                className="kmoz-block kmoz-w-full kmoz-mt-1"
                                readOnly
                            />
                        </div>
                        <div>
                            <Select>
                                <SelectTrigger className="kmoz-w-[180px]">
                                    <SelectValue placeholder="Project Index" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        _projectIndices.map((pr, i) => {
                                            return (
                                                <SelectItem value={String(pr.value)}>{pr.label}</SelectItem>
                                            )
                                        })
                                    }
                                </SelectContent>
                            </Select>
                            <Select
                                value={String(_projectIndices.find(option => option.value === formData.project_index_id)?.value)}
                                onValueChange={handleSelectChange}
                            />
                        </div>
                        <div>
                            <label className="kmoz-block kmoz-font-medium kmoz-text-gray-700 kmoz-text-sm">Quantity</label>
                            <Input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                className="kmoz-block kmoz-w-full kmoz-mt-1"
                            />
                        </div>
                        <div>
                            <label className="kmoz-block kmoz-font-medium kmoz-text-gray-700 kmoz-text-sm">Total HT</label>
                            <Input
                                disabled
                                type="number"
                                name="total_ht"
                                value={formData.total_ht}
                                onChange={handleChange}
                                className="kmoz-block kmoz-w-full kmoz-mt-1"
                            />
                        </div>
                        <div className="kmoz-flex kmoz-justify-end kmoz-space-x-2">
                            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                            <Button variant="default" onClick={handleSave}>Save</Button>
                        </div>
                    </form>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
};

export default EditDevisDialog;
