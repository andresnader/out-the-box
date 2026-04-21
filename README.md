# Documento de Especificación: Box Studio Client Portal V1

## 1. Visión del Proyecto
Box Studio Client Portal es una plataforma propietaria diseñada para transformar la rendición de cuentas de la agencia en una experiencia interactiva, transparente y automatizada. El objetivo es centralizar la data operativa (Asana) y la data de rendimiento (Metricool) en un dashboard premium, asistido por Inteligencia Artificial para consultas 24/7.

## 2. Arquitectura del Sistema
La solución se basa en una arquitectura de Data-Hub que centraliza tres fuentes principales:

### A. Capa de Ingesta (Fuentes de Datos)
- **Metricool (MCP - Metricool Connection Protocol):**
  - **Función:** Extracción de KPIs de Social Media, Reach, Engagement e inversión publicitaria (Meta, Google, TikTok).
  - **Métrica Clave:** ROAS (Retorno de Inversión Publicitaria) y CPA (Costo por Adquisición).
- **Asana (Project Management API):**
  - **Función:** Extracción de tareas completadas, hitos alcanzados y bitácora de ejecución.
  - **Métrica Clave:** Nivel de cumplimiento y transparencia operativa.

### B. Capa de Procesamiento (Backend & Logic)
- **Firebase/Google Cloud:** Gestión de base de datos (Firestore) y autenticación segura para clientes.
- **IA Bajo Demanda (OpenAI/Anthropic RAG):** Un motor de IA que "lee" los datos de Metricool y Asana del cliente para responder preguntas específicas (ej: "¿Por qué subió el CPA en la tercera semana?").

### C. Capa de Presentación (Frontend)
- **React + Tailwind CSS:** Interfaz ultra-rápida, responsiva y con estética de agencia premium.
- **Recharts:** Visualización dinámica de datos.

## 3. Funcionalidades Clave

### 3.1. Dashboard de Performance Dinámico
- **Visualización ROI vs Inversión:** Gráficos comparativos que muestran la rentabilidad directa de las campañas.
- **Health Score:** Un indicador general del estado del proyecto basado en la combinación de KPIs de Metricool.

### 3.2. Bitácora de Gestión (Powered by Asana)
- Sincronización automática de las tareas marcadas como "Finalizadas" en Asana.
- Clasificación por categorías: `#Estrategia`, `#Diseño`, `#Ads`, `#Copywriting`.

### 3.3. Consultor IA 24/7
- Chatbot integrado que tiene acceso al contexto mensual del cliente.
- Capacidad de análisis: "Explícame este reporte" o "¿Qué acciones de Asana impactaron en mis ventas de este mes?".

### 3.4. Automatización de Reportes (The "Golden Bridge")
- **Generación de PDF:** Al cierre de mes, el sistema compila la data y genera un PDF estético.
- **Notificación Multi-canal:** Envío automático de un mensaje de WhatsApp (vía Twilio/360dialog) y un correo electrónico con el link directo al reporte y el PDF adjunto.

## 4. Diseño y UX (User Experience)
- **Concepto:** "Dark & Light Mode" sofisticado con acentos en Rose-600.
- **Navegación:** Minimalista, enfocada en tres pilares: Resultados, Bitácora y Configuración.
- **Personalización:** Cada cliente ve su logo y el nombre de su Account Manager asignado.

## 5. Roadmap de Implementación

| Fase | Tarea | Fuente de Datos |
| :--- | :--- | :--- |
| Fase 1 | Estructura Base y Login | Firebase Auth |
| Fase 2 | Integración de KPIs (MCP) | API Metricool |
| Fase 3 | Espejo de Actividades | API Asana |
| Fase 4 | Implementación de IA Consultiva | OpenAI + RAG |
| Fase 5 | Automatización WhatsApp/PDF | Node.js + Twilio |

## 6. Conclusión de Valor
Para el cliente de Box Studio, esta herramienta elimina la incertidumbre y la espera de reportes manuales. Para la agencia, reduce la carga operativa de reporting en un 80% y posiciona a la marca como una entidad tecnológica y vanguardista en el mercado de medios digitales.

---
**Enlaces útiles:**
- Comparto las interfaces de stitch: [https://stitch.withgoogle.com/projects/17340830579716297328](https://stitch.withgoogle.com/projects/17340830579716297328)