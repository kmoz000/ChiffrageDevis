import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "../dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select";
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

type AddDevisDialogProps = {
    onSave: (newDevis: Devis) => void;
};

const AddDevisDialog: React.FC<AddDevisDialogProps> = ({ onSave }) => {
    const [open, setOpen] = useState(false);
    const [selectedProjectHT, setSelectedProjectHT] = useState(0)
    const [formData, setFormData] = useState<Devis>({
        id: 0,
        project_index_id: 0,
        quantity: 0,
        total_ht: 0,
    });
    const [projectIndices, setProjectIndices] = useState<ProjectIndex[]>([]);

    useEffect(() => {
        (async () => {
            const loadedProjectIndices = await databaseService.fetchAllProjectIndexes() || [];
            setProjectIndices(loadedProjectIndices);
        })();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: parseFloat(value), total_ht: formData.quantity * selectedProjectHT });
    };

    const handleSelectChange = (value: string) => {
        databaseService.findOneProjectIndex(parseInt(value)).then(pr => {
            if (pr) {
                setSelectedProjectHT(pr.pv_un_prix_vente_dh_ht)
                setFormData({ ...formData, project_index_id: parseInt(value), total_ht: formData.quantity * pr.pv_un_prix_vente_dh_ht });
                return
            }
            setFormData({ ...formData, project_index_id: parseInt(value) });
        }).catch(() => {
            setFormData({ ...formData, project_index_id: parseInt(value) });
        })
    };

    const handleSave = () => {
        onSave(formData);
        setOpen(false);
        toast.success("Devis added successfully!");
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default" className="kmoz-mx-2 kmoz-my-1">
                    Ajouter
                </Button>
            </DialogTrigger>
            <DialogPortal>
                <DialogOverlay className="kmoz-fixed kmoz-inset-0 kmoz-bg-black/50" />
                <DialogContent className="kmoz-top-1/2 kmoz-left-1/2 kmoz-h-[85%] kmoz-p-6 kmoz-fixed kmoz-bg-white kmoz-shadow-lg kmoz-rounded-lg">
                    <DialogTitle>Add New Devis</DialogTitle>
                    <DialogDescription>Enter details for the new devis below.</DialogDescription>
                    <form className="kmoz-space-y-4">
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
                            <label className="kmoz-block kmoz-font-medium kmoz-text-gray-700 kmoz-text-sm">Project Index</label>
                            <Select value={String(formData.project_index_id)} onValueChange={handleSelectChange}>
                                <SelectTrigger className="kmoz-w-full">
                                    <SelectValue placeholder="Select a project index" />
                                </SelectTrigger>
                                <SelectContent>
                                    {projectIndices.map((pi) => (
                                        <SelectItem key={pi.id} value={String(pi.id)}>
                                            {pi.designation}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="kmoz-block kmoz-font-medium kmoz-text-gray-700 kmoz-text-sm">Total HT</label>
                            <Input
                                type="number"
                                name="total_ht"
                                value={formData.total_ht}
                                disabled
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

export default AddDevisDialog;
