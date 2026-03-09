import { NextRequest, NextResponse } from 'next/server';
import { login } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        const { password } = await request.json();

        const success = await login(password);

        if (success) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json(
                { error: '密码错误' },
                { status: 401 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            { error: '登录失败' },
            { status: 500 }
        );
    }
}
