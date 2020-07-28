
class CodeSmellsService {

    showDetectionsOnFile(fileContent: string, detectionResults: any[], detectors: any[]) {

        detectors = this.indexByName(detectors);
        const referencesAndMessages: any = this.getReferencesAndMessages(detectionResults, detectors);
        
        return this.addInfoToFile(fileContent, referencesAndMessages);
    }

    indexByName(detectors:any) {
    
        return detectors.reduce((indexedDetectors: any, detector:any) => {

            indexedDetectors[detector.name] = detector;
            return indexedDetectors;
        }, {});
    }
    
    getReferencesAndMessages(detectionResults: any[], detectors: any[]){

        const referencesAndMessages: any = [];
        detectionResults.forEach( ( dResult: any ) => {
            
            dResult.detections.forEach((detection: string) => {
                referencesAndMessages.push({
                    reference: detection.split(' ')[detectors[dResult.name].referenceIndex],
                    referenceType: detectors[dResult.name].referenceType,
                    message: detection
                });
            });
        });
        return referencesAndMessages;
    }

    addInfoToFile(fileContent: string, referencesAndMessages: any[]) {
        
        const usedKeywords: string[] = [];

        referencesAndMessages.forEach(data => {
            if (usedKeywords.indexOf(data.reference) < 0) { // no se puede reemplazar 2 veces la misma palabra

                fileContent = fileContent.replace(data.reference, this.addTooltipAndFormat(data.reference, data.message));
                usedKeywords.push(data.reference);
            }
        })
        return fileContent;
    }

    addTooltipAndFormat(text: string, tooltipText: string) {

        //TO-DO: cambiar esto por un tooltip mejor
        return '<span class="highlighted" title=\'' + tooltipText + '\'>' + text + '</span>';
    }

}

export default new CodeSmellsService();