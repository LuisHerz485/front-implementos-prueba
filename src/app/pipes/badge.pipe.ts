import { NgModule, Pipe, PipeTransform } from '@angular/core';

interface DesStatusMap {
    [key: string]: string;
}

@Pipe({ name: 'classBadgePipe', pure: true })
export class classBadgePipe implements PipeTransform {
    private classBadgePipeMap: DesStatusMap = {
        UN: 'bagde__unidad',
        RLL: 'bagde__rollo',
        BA: 'bagde__barril',
    };

    transform(value: string) {
        return this.classBadgePipeMap[value] || '';
    }
}

@NgModule({
    declarations: [classBadgePipe],
    exports: [classBadgePipe],
})
export class ClassBadgePipeModule {}
