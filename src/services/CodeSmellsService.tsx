
class CodeSmellsService {

    showDetectionsOnFile(fileContent: string, detectionResults: any, detectors: any) {

        const messagesFormatInfo = detectors.find((detector: { name: any; }) => {
            return detector.name === detectionResults.name;
        });
        const referencesAndMessages = this.identificatesFileReferences(detectionResults.detections, messagesFormatInfo);
        
        return this.addInfoToFile(fileContent, referencesAndMessages);
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
        return '<span class="highlighted" title=\'' + tooltipText + '\'>' + text + '</span>';
    }

}

export default new CodeSmellsService();