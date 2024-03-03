import { parsePHP, parseLess, parseSass, parseJavascript } from '../utils/import-parser'

describe('PHP Import Parser', () => {
    it('should parse PHP file imports correctly', () => {
        const fileContent = `
            <?php
            require 'file1.php';
            require_once('file2.php');
            include "file3.php";
            include_once ('file4.php');
        `

        const expected = ['file1.php', 'file2.php', 'file3.php', 'file4.php']
        expect(parsePHP(fileContent)).toEqual(expected)
    })
})

describe('LESS Import Parser', () => {
    it('should parse LESS file imports correctly', () => {
        const fileContent = `
            @import 'styles/base.less';
            @import "components/buttons.less";
        `

        const expected = ['styles/base.less', 'components/buttons.less']
        expect(parseLess(fileContent)).toEqual(expected)
    })
})

describe('SASS Import Parser', () => {
    it('should parse SASS file imports correctly', () => {
        const fileContent = `
            @import 'styles/base.scss';
            @import "components/buttons.scss";
        `

        const expected = ['styles/base.scss', 'components/buttons.scss']
        expect(parseSass(fileContent)).toEqual(expected)
    })
})

describe('JavaScript Import Parser', () => {
    it('should parse JavaScript file imports correctly', () => {
        const data = `
            // This is a comment
            import React from 'react';
            import { useState } from 'react';
            import myDefaultExport from './myModule';
        `

        const expected = [
            { name: 'React', path: 'react', alias: '', relation: 'react' },
            { name: 'useState', path: 'react', alias: '', relation: 'react' },
            { name: 'myDefaultExport', path: './myModule', alias: '', relation: 'myModule' },
        ]

        // @ts-ignore
        const result = parseJavascript(data).map(({ name, path, alias, relation }) => ({ name, path, alias, relation }))
        expect(result).toEqual(expected)
    })
})
