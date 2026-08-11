import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const generateAIReportPDF = (report) => {

    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();

    // ============================
    // Header
    // ============================

    doc.setFillColor(8, 47, 73);
    doc.rect(0, 0, pageWidth, 35, "F");

    doc.setTextColor(255,255,255);
    doc.setFontSize(22);
    doc.setFont(undefined,"bold");
    doc.text("PharmaTrack",14,15);

    doc.setFontSize(11);
    doc.setFont(undefined,"normal");
    doc.text(
        "AI-Driven Blockchain Pharmaceutical Supply Chain",
        14,
        23
    );

    doc.setFontSize(15);
    doc.text("AI FORENSIC ANALYSIS REPORT",14,31);

    let y = 45;

    // ============================
    // Report Information
    // ============================

    doc.setTextColor(0,0,0);

    doc.setFontSize(15);
    doc.setFont(undefined,"bold");
    doc.text("Report Information",14,y);

    autoTable(doc,{
        startY:y+5,
        head:[["Field","Value"]],
        body:[
            [
                "Generated On",
                new Date(report.analyzedAt).toLocaleString()
            ],
            [
                "Drug ID",
                report.drugId
            ],
            [
                "Status",
                report.status
            ],
            [
                "Model Version",
                report.modelVersion
            ],
            [
                "Analysis Source",
                report.analysisSource
            ]
        ],
        theme:"grid",
        headStyles:{
            fillColor:[8,47,73]
        }
    });

    y = doc.lastAutoTable.finalY + 12;

    // ============================
    // Drug Information
    // ============================

    doc.setFontSize(15);
    doc.setFont(undefined,"bold");
    doc.text("Drug Information",14,y);

    autoTable(doc,{
        startY:y+5,
        head:[["Property","Value"]],
        body:[
            [
                "Drug Name",
                report.drug?.name || "-"
            ],
            [
                "Batch Number",
                report.drug?.batchNumber || "-"
            ],
            [
                "Current Stage",
                report.currentStage
            ],
            [
                "Blockchain",
                report.blockchainVerified
                ? "Verified"
                : "Not Verified"
            ],
            [
                "Total Scans",
                report.totalScans
            ],
            [
                "Transfers",
                report.totalTransfers
            ]
        ],
        theme:"grid",
        headStyles:{
            fillColor:[8,47,73]
        }
    });

    y = doc.lastAutoTable.finalY + 12;

    // ============================
    // AI Analysis
    // ============================

    doc.setFontSize(15);
    doc.setFont(undefined,"bold");
    doc.text("AI Analysis",14,y);

    autoTable(doc,{
        startY:y+5,
        head:[["Metric","Value"]],
        body:[
            ["Risk Score",report.riskScore],
            ["Risk Level",report.riskLevel],
            ["Prediction",report.prediction],
            ["Confidence",`${report.confidence}%`],
            ["Anomaly Score",report.anomalyScore],
            ["Total Anomalies",report.totalAnomalies]
        ],
        theme:"grid",
        headStyles:{
            fillColor:[8,47,73]
        }
    });

    y = doc.lastAutoTable.finalY + 12;

    // ============================
    // Summary
    // ============================

    doc.setFontSize(15);
    doc.setFont(undefined,"bold");
    doc.text("Summary",14,y);

    autoTable(doc,{
        startY:y+5,
        body:[
            [report.summary]
        ],
        theme:"plain"
    });

    y = doc.lastAutoTable.finalY + 10;

    // ============================
    // Risk Factors
    // ============================

    doc.setFontSize(15);
    doc.setFont(undefined,"bold");
    doc.text("Risk Factors",14,y);

    autoTable(doc,{
        startY:y+5,
        head:[["Factor","Severity","Description"]],
        body:
        report.riskFactors?.map(item=>[
            item.factor,
            item.severity,
            item.description
        ]) || [],
        headStyles:{
            fillColor:[8,47,73]
        }
    });

    y = doc.lastAutoTable.finalY + 10;

    // ============================
    // AI Insights
    // ============================

    doc.setFontSize(15);
    doc.text("AI Insights",14,y);

    autoTable(doc,{
        startY:y+5,
        head:[["Type","Description"]],
        body:
        report.insights?.map(item=>[
            item.type,
            item.description
        ]) || [],
        headStyles:{
            fillColor:[8,47,73]
        }
    });

    y = doc.lastAutoTable.finalY + 10;

    // ============================
    // Recommendations
    // ============================

    doc.setFontSize(15);
    doc.text("Recommendations",14,y);

    autoTable(doc,{
        startY:y+5,
        head:[["Recommendation","Priority"]],
        body:
        report.recommendations?.map(item=>[
            item.title,
            item.priority
        ]) || [],
        headStyles:{
            fillColor:[8,47,73]
        }
    });

    // ============================
    // Footer
    // ============================

    const pageHeight = doc.internal.pageSize.height;

    doc.setDrawColor(180);
    doc.line(14,pageHeight-18,pageWidth-14,pageHeight-18);

    doc.setFontSize(10);
    doc.setTextColor(120);

    doc.text(
        "Generated by PharmaTrack AI • Final Year Project",
        14,
        pageHeight-10
    );

    doc.save(`AI_Report_${report.drugId}.pdf`);

};

export default generateAIReportPDF;