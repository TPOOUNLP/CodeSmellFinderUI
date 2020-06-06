
class CodeSmellsService {

    showDetectionsOnFile(fileContent: string, detectionResults: any) {

        const messagesFormatInfo = this.getDetectionMessageFormat(detectionResults.name);
        const referencesAndMessages = this.identificatesFileReferences(detectionResults.detections, messagesFormatInfo);
        
        return this.addInfoToFile(fileContent, referencesAndMessages);
    }

    getDetectionMessageFormat(detectionName: string) {

        const detectionMessageFormats: any = {
            'Identifier Too Long': { referenceType: 'identifier', referenceIndex: 2},
            'Repeated Methods': { referenceType: 'method', referenceIndex: 0},
            'Too Many Parameters in Method': { referenceType: 'method', referenceIndex: 1},
            'Too Many Lines in Method': { referenceType: 'method', referenceIndex: 0},
        };
        return detectionMessageFormats[detectionName];
    }

    identificatesFileReferences(detections: string[], messagesFormatInfo: any) {
        
        if (messagesFormatInfo) {

            const referencesAndMessages: any = [];
            detections.forEach((detection) => {
                referencesAndMessages.push({
                    reference: detection.split(' ')[messagesFormatInfo.referenceIndex],
                    referenceType: messagesFormatInfo.referenceType,
                    message: detection
                });
            });
            return referencesAndMessages;
        }
    }

    addInfoToFile(fileContent: string, referencesAndMessages: any[]) {
        
        referencesAndMessages.forEach(data => {
            fileContent = fileContent.replace(data.reference, this.addTooltipAndFormat(data.reference, data.message));
        })
        return fileContent;
    }

    addTooltipAndFormat(text: string, tooltipText: string) {

        //TO-DO: cambiar esto por un tooltip mejor
        return '<span class="highlighted" title="' + tooltipText + '">' + text + '</span>';
    }

}

export default new CodeSmellsService();