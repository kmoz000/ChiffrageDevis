// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri_plugin_sql::{Migration, MigrationKind};

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    let migrations = vec![
        // Define your migrations here
        Migration {
            version: 1,
            description: "create_initial_tables",
            sql: "
                CREATE TABLE articles (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    designation TEXT,
                    unit TEXT,
                    prix_achat_transport REAL,
                    chutes REAL,
                    consommable REAL,
                    boulonnerie REAL,
                    total REAL
                );
        
                CREATE TABLE project_index (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    designation TEXT,
                    unite TEXT,
                    qte REAL,
                    matiere REAL,
                    mo REAL,
                    ce REAL,
                    cout REAL,
                    frais_machine REAL,
                    peinture REAL,
                    transport REAL,
                    manutention_mo_mont REAL,
                    ce_mont REAL,
                    cout_mont REAL,
                    frais_dep_chant REAL,
                    prix_de_revient REAL,
                    pr_un REAL,
                    marge REAL,
                    pv_un REAL,
                    pv_un_prix_vente_dh_ht REAL
                );
        
                CREATE TABLE devis (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    project_index_id INTEGER,
                    quantity INTEGER,
                    total_ht REAL,
                    FOREIGN KEY (project_index_id) REFERENCES project_index(id)
                );
            ",
            kind: MigrationKind::Up,
        },
    ];
    tauri::Builder::default()
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:base.db", migrations)
                .build(),
        )
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
