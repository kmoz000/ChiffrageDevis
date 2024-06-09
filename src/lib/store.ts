import Database from "tauri-plugin-sql-api";

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

export type ProjectIndex = {
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

type Devis = {
    id: number;
    project_index_id: number;
    quantity: number;
    total_ht: number;
};

class DatabaseService {
    // Methods for articles
    private db: Database;

    constructor(db: Database) {
        this.db = db;
    }
    async addArticle(
        designation: string,
        unit: string,
        prixAchatTransport: number,
        chutes: number,
        consommable: number,
        boulonnerie: number,
        total: number
    ) {
        const sql = `
            INSERT INTO articles (designation, unit, prix_achat_transport, chutes, consommable, boulonnerie, total)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        await this.db.execute(sql, [designation, unit, prixAchatTransport, chutes, consommable, boulonnerie, total]);
    }

    async removeArticle(id: number) {
        const sql = `DELETE FROM articles WHERE id = ?`;
        await this.db.execute(sql, [id]);
    }

    async updateArticle(
        id: number,
        designation: string,
        unit: string,
        prixAchatTransport: number,
        chutes: number,
        consommable: number,
        boulonnerie: number,
        total: number
    ) {
        const sql = `
            UPDATE articles
            SET designation = ?, unit = ?, prix_achat_transport = ?, chutes = ?, consommable = ?, boulonnerie = ?, total = ?
            WHERE id = ?
        `;
        await this.db.execute(sql, [designation, unit, prixAchatTransport, chutes, consommable, boulonnerie, total, id]);
    }

    async findOneArticle(id: number): Promise<Article | null> {
        const sql = `SELECT * FROM articles WHERE id = ?`;
        const result = await this.db.select<Article[]>(sql, [id]);
        return result.length ? result[0] : null;
    }

    async fetchAllArticles(): Promise<Article[]> {
        const sql = `SELECT * FROM articles`;
        return await this.db.select<Article[]>(sql);
    }

    // Methods for project_index
    async addProjectIndex(
        designation: string,
        unite: string,
        qte: number,
        matiere: number,
        mo: number,
        ce: number,
        cout: number,
        fraisMachine: number,
        peinture: number,
        transport: number,
        manutentionMoMont: number,
        ceMont: number,
        coutMont: number,
        fraisDepChant: number,
        prixDeRevient: number,
        prUn: number,
        marge: number,
        pvUn: number,
        pvUnPrixVenteDhHt: number
    ) {
        const sql = `
            INSERT INTO project_index (
                designation, unite, qte, matiere, mo, ce, cout, frais_machine, peinture, transport,
                manutention_mo_mont, ce_mont, cout_mont, frais_dep_chant, prix_de_revient, pr_un, marge, pv_un, pv_un_prix_vente_dh_ht
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        await this.db.execute(sql, [
            designation, unite, qte, matiere, mo, ce, cout, fraisMachine, peinture, transport,
            manutentionMoMont, ceMont, coutMont, fraisDepChant, prixDeRevient, prUn, marge, pvUn, pvUnPrixVenteDhHt
        ]);
    }

    async removeProjectIndex(id: number) {
        const sql = `DELETE FROM project_index WHERE id = ?`;
        await this.db.execute(sql, [id]);
    }

    async updateProjectIndex(
        id: number,
        designation: string,
        unite: string,
        qte: number,
        matiere: number,
        mo: number,
        ce: number,
        cout: number,
        fraisMachine: number,
        peinture: number,
        transport: number,
        manutentionMoMont: number,
        ceMont: number,
        coutMont: number,
        fraisDepChant: number,
        prixDeRevient: number,
        prUn: number,
        marge: number,
        pvUn: number,
        pvUnPrixVenteDhHt: number
    ) {
        const sql = `
            UPDATE project_index
            SET designation = ?, unite = ?, qte = ?, matiere = ?, mo = ?, ce = ?, cout = ?, frais_machine = ?, peinture = ?, transport = ?,
                manutention_mo_mont = ?, ce_mont = ?, cout_mont = ?, frais_dep_chant = ?, prix_de_revient = ?, pr_un = ?, marge = ?, pv_un = ?, pv_un_prix_vente_dh_ht = ?
            WHERE id = ?
        `;
        await this.db.execute(sql, [
            designation, unite, qte, matiere, mo, ce, cout, fraisMachine, peinture, transport,
            manutentionMoMont, ceMont, coutMont, fraisDepChant, prixDeRevient, prUn, marge, pvUn, pvUnPrixVenteDhHt, id
        ]);
    }

    async findOneProjectIndex(id: number): Promise<ProjectIndex | null> {
        const sql = `SELECT * FROM project_index WHERE id = ?`;
        const result = await this.db.select<ProjectIndex[]>(sql, [id]);
        return result.length ? result[0] : null;
    }

    async fetchAllProjectIndexes(): Promise<ProjectIndex[]> {
        const sql = `SELECT * FROM project_index`;
        return await this.db.select<ProjectIndex[]>(sql);
    }

    // Methods for devis
    async addDevis(projectIndexId: number, quantity: number, totalHt: number) {
        const sql = `
            INSERT INTO devis (project_index_id, quantity, total_ht)
            VALUES (?, ?, ?)
        `;
        await this.db.execute(sql, [projectIndexId, quantity, totalHt]);
    }

    async removeDevis(id: number) {
        const sql = `DELETE FROM devis WHERE id = ?`;
        await this.db.execute(sql, [id]);
    }

    async updateDevis(id: number, projectIndexId: number, quantity: number, totalHt: number) {
        const sql = `
            UPDATE devis
            SET project_index_id = ?, quantity = ?, total_ht = ?
            WHERE id = ?
        `;
        await this.db.execute(sql, [projectIndexId, quantity, totalHt, id]);
    }

    async findOneDevis(id: number): Promise<Devis | null> {
        const sql = `SELECT * FROM devis WHERE id = ?`;
        const result = await this.db.select<Devis[]>(sql, [id]);
        return result.length ? result[0] : null;
    }

    async fetchAllDevis(): Promise<Devis[]> {
        const sql = `SELECT * FROM devis`;
        return await this.db.select<Devis[]>(sql);
    }
}
export const db = await Database.load("sqlite:base.db");
export const databaseService = new DatabaseService(db);
