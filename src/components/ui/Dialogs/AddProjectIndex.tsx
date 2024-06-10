import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "../dialog";

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

type AddProjectIndexDialogProps = {
    onSave: (newProjectIndex: ProjectIndex) => void;
};

const AddProjectIndexDialog: React.FC<AddProjectIndexDialogProps> = ({ onSave }) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState<ProjectIndex>({
        id: 0,
        designation: "",
        unite: "",
        qte: 0,
        matiere: 0,
        mo: 0,
        ce: 0,
        cout: 0,
        frais_machine: 0,
        peinture: 0,
        transport: 0,
        manutention_mo_mont: 0,
        ce_mont: 0,
        cout_mont: 0,
        frais_dep_chant: 0,
        prix_de_revient: 0,
        pr_un: 0,
        marge: 0,
        pv_un: 0,
        pv_un_prix_vente_dh_ht: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: parseFloat(value) ? parseFloat(value) : value,
            ce: formData.mo * 0.1,
            cout: formData.mo + formData.ce,
            ce_mont: formData.manutention_mo_mont * 0.1,
            cout_mont: formData.manutention_mo_mont * 60 + formData.ce_mont * 110,
            frais_dep_chant: (formData.manutention_mo_mont + formData.ce_mont) * 14,
            prix_de_revient: (formData.cout_mont * 1.06) + formData.cout + formData.frais_machine + formData.peinture + formData.transport + formData.manutention_mo_mont + formData.cout_mont + formData.frais_dep_chant,
            pr_un: formData.prix_de_revient / formData.qte,
            pv_un: formData.pr_un * (1 + (formData.marge / 100)),
            pv_un_prix_vente_dh_ht: formData.pv_un

        });
    };

    const handleSave = () => {
        onSave(formData);
        setOpen(false);
        toast.success("Project Index added successfully!");
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default" className="kmoz-mx-2 kmoz-my-1">
                    Ajouter
                </Button>
            </DialogTrigger>
            <DialogPortal>
                <DialogOverlay className="kmoz-fixed kmoz-inset-0 kmoz-bg-black kmoz-bg-opacity-50" />
                <DialogContent className="kmoz-h-[85%] kmoz-p-6 kmoz-fixed kmoz-bg-white kmoz-shadow-lg kmoz-rounded-lg kmoz-overflow-x-hidden kmoz-overflow-y-scroll no-scrollbar">
                    <DialogTitle>Add New Project Index</DialogTitle>
                    <DialogDescription>Enter details for the new project index below.</DialogDescription>
                    <form className="kmoz-space-y-4">
                        <div>
                            <label className="kmoz-block kmoz-font-medium kmoz-text-gray-700 kmoz-text-sm">Designation</label>
                            <Input
                                type="text"
                                name="designation"
                                required
                                value={formData.designation}
                                onChange={handleChange}
                                className="kmoz-block kmoz-w-full kmoz-mt-1"
                            />
                        </div>
                        <div>
                            <label className="kmoz-block kmoz-font-medium kmoz-text-gray-700 kmoz-text-sm">Unite</label>
                            <Input
                                type="text"
                                name="unite"
                                value={formData.unite}
                                required
                                onChange={handleChange}
                                className="kmoz-block kmoz-w-full kmoz-mt-1"
                            />
                        </div>
                        <div>
                            <label className="kmoz-block kmoz-font-medium kmoz-text-gray-700 kmoz-text-sm">Quantité (qte)</label>
                            <Input
                                type="number"
                                name="qte"
                                value={formData.qte}
                                required
                                onChange={handleChange}
                                className="kmoz-block kmoz-w-full kmoz-mt-1"
                            />
                        </div>
                        <div>
                            <label className="kmoz-block kmoz-font-medium kmoz-text-gray-700 kmoz-text-sm">Matiere</label>
                            <Input
                                type="number"
                                name="matiere"
                                required
                                value={formData.matiere}
                                onChange={handleChange}
                                className="kmoz-block kmoz-w-full kmoz-mt-1"
                            />
                        </div>
                        <div>
                            <label className="kmoz-block kmoz-font-medium kmoz-text-gray-700 kmoz-text-sm">MO</label>
                            <Input
                                type="number"
                                name="mo"
                                required
                                value={formData.mo}
                                onChange={handleChange}
                                className="kmoz-block kmoz-w-full kmoz-mt-1"
                            />
                        </div>
                        <div>
                            <label className="kmoz-block kmoz-font-medium kmoz-text-gray-700 kmoz-text-sm">CE</label>
                            <Input
                                type="number"
                                name="ce"
                                value={formData.ce}
                                disabled
                                onChange={handleChange}
                                className="kmoz-block kmoz-w-full kmoz-mt-1"
                            />
                        </div>
                        <div>
                            <label className="kmoz-block kmoz-font-medium kmoz-text-gray-700 kmoz-text-sm">Cout</label>
                            <Input
                                type="number"
                                name="cout"
                                value={formData.cout}
                                disabled
                                onChange={handleChange}
                                className="kmoz-block kmoz-w-full kmoz-mt-1"
                            />
                        </div>
                        <div>
                            <label className="kmoz-block kmoz-font-medium kmoz-text-gray-700 kmoz-text-sm">Frais Machine</label>
                            <Input
                                type="number"
                                name="frais_machine"
                                value={formData.frais_machine}
                                required
                                onChange={handleChange}
                                className="kmoz-block kmoz-w-full kmoz-mt-1"
                            />
                        </div>
                        <div>
                            <label className="kmoz-block kmoz-font-medium kmoz-text-gray-700 kmoz-text-sm">Peinture</label>
                            <Input
                                type="number"
                                name="peinture"
                                value={formData.peinture}
                                required
                                onChange={handleChange}
                                className="kmoz-block kmoz-w-full kmoz-mt-1"
                            />
                        </div>
                        <div>
                            <label className="kmoz-block kmoz-font-medium kmoz-text-gray-700 kmoz-text-sm">Transport</label>
                            <Input
                                type="number"
                                name="transport"
                                value={formData.transport}
                                required
                                onChange={handleChange}
                                className="kmoz-block kmoz-w-full kmoz-mt-1"
                            />
                        </div>
                        <div>
                            <label className="kmoz-block kmoz-font-medium kmoz-text-gray-700 kmoz-text-sm">Manutention MO Mont</label>
                            <Input
                                type="number"
                                name="manutention_mo_mont"
                                value={formData.manutention_mo_mont}
                                required
                                onChange={handleChange}
                                className="kmoz-block kmoz-w-full kmoz-mt-1"
                            />
                        </div>
                        <div>
                            <label className="kmoz-block kmoz-font-medium kmoz-text-gray-700 kmoz-text-sm">CE Mont</label>
                            <Input
                                type="number"
                                name="ce_mont"
                                value={formData.ce_mont}
                                disabled
                                onChange={handleChange}
                                className="kmoz-block kmoz-w-full kmoz-mt-1"
                            />
                        </div>
                        <div>
                            <label className="kmoz-block kmoz-font-medium kmoz-text-gray-700 kmoz-text-sm">Cout Mont</label>
                            <Input
                                type="number"
                                name="cout_mont"
                                value={formData.cout_mont}
                                disabled
                                onChange={handleChange}
                                className="kmoz-block kmoz-w-full kmoz-mt-1"
                            />
                        </div>
                        <div>
                            <label className="kmoz-block kmoz-font-medium kmoz-text-gray-700 kmoz-text-sm">Frais Dep Chant</label>
                            <Input
                                type="number"
                                name="frais_dep_chant"
                                disabled
                                value={formData.frais_dep_chant}
                                onChange={handleChange}
                                className="kmoz-block kmoz-w-full kmoz-mt-1"
                            />
                        </div>
                        <div>
                            <label className="kmoz-block kmoz-font-medium kmoz-text-gray-700 kmoz-text-sm">Prix De Revient</label>
                            <Input
                                type="number"
                                name="prix_de_revient"
                                disabled
                                value={formData.prix_de_revient}
                                onChange={handleChange}
                                className="kmoz-block kmoz-w-full kmoz-mt-1"
                            />
                        </div>
                        <div>
                            <label className="kmoz-block kmoz-font-medium kmoz-text-gray-700 kmoz-text-sm">PR Un</label>
                            <Input
                                type="number"
                                name="pr_un"
                                value={formData.pr_un}
                                disabled
                                onChange={handleChange}
                                className="kmoz-block kmoz-w-full kmoz-mt-1"
                            />
                        </div>
                        <div>
                            <label className="kmoz-block kmoz-font-medium kmoz-text-gray-700 kmoz-text-sm">Marge</label>
                            <Input
                                type="number"
                                name="marge"
                                value={formData.marge}
                                required
                                onChange={handleChange}
                                className="kmoz-block kmoz-w-full kmoz-mt-1"
                            />
                        </div>
                        <div>
                            <label className="kmoz-block kmoz-font-medium kmoz-text-gray-700 kmoz-text-sm">PV Un</label>
                            <Input
                                type="number"
                                name="pv_un"
                                value={formData.pv_un}
                                disabled
                                onChange={handleChange}
                                className="kmoz-block kmoz-w-full kmoz-mt-1"
                            />
                        </div>
                        <div>
                            <label className="kmoz-block kmoz-font-medium kmoz-text-gray-700 kmoz-text-sm">PV Un Prix Vente DH HT</label>
                            <Input
                                type="number"
                                name="pv_un_prix_vente_dh_ht"
                                value={formData.pv_un_prix_vente_dh_ht}
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

export default AddProjectIndexDialog;
